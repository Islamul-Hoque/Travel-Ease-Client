import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser, googleSignIn, setUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit,  formState: { errors }, setValue, } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then(() => {
        toast.success("Logged in successfully!");
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        toast.success("Logged in with Google successfully!");
        navigate(location.state?.from || "/");
      })
      .catch((error) => toast.error(error.message));
  };

  const fillDemoCredentials = () => {
    setValue("email", "ishfak@gmail.com");
    setValue("password", "123456Aa");
    toast.success("Demo credentials filled!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" w-[88vw] md:w-[40vw]  pb-3 rounded-[0.7rem] overflow-hidden shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h2 className="text-[1.4rem] md:text-3xl font-bold text-center pt-6"> Login to <span className="text-gradient">TravelEase</span>
        </h2>
        <div className="card-body text-gray-800 dark:text-gray-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">

              <label className="label text-gray-700 dark:text-gray-300">  Email address </label>
              <input type="email" className="input bg-gray-50 dark:bg-gray-700 w-full" placeholder="Enter your email address"
                {...register("email", { required: "Email is required" })} />
              {errors.email && ( <p className="text-red-500 text-xs">{errors.email.message}</p>)}

              <div className="relative">
                <label className="label mb-[0.38rem] mt-2 text-gray-700 dark:text-gray-300"> Password </label>
                <input  type={show ? "text" : "password"}  placeholder="Enter your password"  className="input bg-gray-50 dark:bg-gray-700 w-full"
                  {...register("password", {  required: "Password is required",   minLength: { value: 6, message: "Minimum 6 characters" },    })}
                />
                <span  onClick={() => setShow(!show)}   className="absolute text-[1rem] right-4 top-[2.77rem] cursor-pointer z-50"  >
                  {show ? <FaEye /> : <IoEyeOff />}
                </span>
              </div>
              {errors.password && ( <p className="text-red-500 text-xs">{errors.password.message}</p>   )}

              <div className="flex justify-end text-sm mt-2">
                <button type="button" onClick={fillDemoCredentials}  className="text-xs px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" > Use Demo Credentials </button>
              </div>

              <button type="submit" className="btn-primary-w-full mt-4">   Login </button>
            </fieldset>
          </form>

          <p className="text-gray-500 dark:text-gray-400 text-center mt-4">  Don’t have an account?{" "} <Link to="/register" className="text-gradient font-medium"> Sign Up</Link>
          </p>

          <div className="flex items-center gap-3 mt-6">
            <hr className="flex-1 border-gray-200" />
            <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <button onClick={handleGoogleSignIn} className="btn w-full bg-white text-black rounded-md border border-[#e5e5e5] flex items-center justify-center gap-2 mt-4" > 
            <FcGoogle size={18} />  Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;