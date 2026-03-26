import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { replace, useLocation } from "react-router-dom";
import rightSide from "../assets/Right_Side.png";
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");

  const location = useLocation();
  const path = location.state?.from || "/";

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate(path, { replace: true });
    }
  }, [token]);

  return (

    <div className="flex w-full h-full gap-4 p-8 overflow-hidden bg-gray-900 mt-14 relative">
      <div className={`w-full h-full  ${currentState === "Login"?'md:-translate-x-20 -translate-x-10':'translate-x-[20%] '} transition-all duration-700`}>
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-full gap-4 p-4 m-auto text-gray-800 bg-gray-900 sm:max-w-96 "
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800 outline-none"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800 outline-none"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPasword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800 outline-none"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-center text-sm mt-[-8px]">
        <p className="cursor-pointer hover:text-blue-300 active:text-red-300">
          Forgot your password?
        </p>
      </div>
      <button className="px-8 py-2 mt-4 font-light text-red-300 bg-black hover:bg-gray-600 active:bg-blue-300">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
      </div>

      
      <div className={`absolute w-[200%] h-[90%]  bg-gray-800  flex flex-col justify-center rounded-[5rem] z-20 transform transition-all duration-700  ${currentState ==='Login'?'md:translate-x-[30%] translate-x-[30%]':'-translate-x-[90%] md:-translate-x-[80%]'} overflow-hidden border-gray-400 border`}>
        <div className={`flex flex-col gap-2 ${currentState === "Login" ? 'md:translate-x-10 translate-x-5': 'translate-x-[85.5%]'} transition-all duration-700`}>
           <h1 className="text-sm font-extrabold md:text-3xl">{currentState === "Login" ? 'Hello, Welcome!': 'Welcome Back!'}</h1>
           <p className="text-xs md:text-sm">{currentState === "Login" ? "Don't have an account ?" :"Already have an account?"}</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="w-20 p-2 text-center border cursor-pointer hover:text-blue-300 active:text-red-300"
          >
            Register
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="w-20 p-2 text-center border cursor-pointer hover:text-blue-300 active:text-red-300"
          >
            Login 
          </p>
        )}
        </div>
       
      </div>
       
      
    </div>
  );
};

export default Login;
