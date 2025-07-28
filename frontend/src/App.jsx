import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import { VirtualTryOn } from "./pages/VirtualTryOn";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useLoading } from "./context/LoadingContext";
import { FullScreenLoader } from "./components/FullScreenLoader";
import { useEffect } from "react";
import AiChat from "./components/AiChat";
const App = () => {
  const { loading } = useLoading();

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-gray-950 ">
        <ToastContainer />
        <AiChat />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />

          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/virtualtry-on/:productId/:size"
              element={<VirtualTryOn />}
            />
            <Route path="/verify" element={<Verify />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
