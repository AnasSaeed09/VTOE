import React, { useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export const ProtectedRoute = () => {
  const { token } = useContext(ShopContext);
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);

  if (redirect)
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  if (!token) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-black border-4 border-black rounded p-6 shadow-lg text-center object-cover overflow-hidden">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            Login Required
          </h2>
          <p className="mb-4 text-yellow-100">
            You must login in to access this page.
          </p>
          <button
            className="bg-blue-800 text-yellow-100 px-4 py-2 rounded border-2 hover:bg-blue-400 hover:shadow-md hover:shadow-blue-300 active:bg-slate-700 transition cursor-pointer"
            onClick={() => setRedirect(true)}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
  return <Outlet />;
};
