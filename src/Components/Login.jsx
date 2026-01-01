// import React, {  useContext, useState } from 'react';
// import { Link, useLocation, useNavigate,  } from 'react-router';
// import { FaEye } from "react-icons/fa";
// import { FcGoogle } from 'react-icons/fc';
// import { IoEyeOff } from 'react-icons/io5';
// import { toast } from 'react-toastify';
// import { AuthContext } from '../Context/AuthProvider';

// const Login = () => {
//     const { signInUser, googleSignIn, setUser } = useContext(AuthContext)
//     const [show, setShow] = useState(false)
//     const [error, setError] = useState('')

//     const location = useLocation()
//     const navigate = useNavigate()

//     const handleLogin = e => {
//         e.preventDefault()
//         setError('');
//         const email = e.target.email.value
//         const password = e.target.password.value

//         if (!email) {
//             return setError('Please enter your email address.')
//         }
//         if (!password) {
//             return setError('Please enter your password.')
//         }

//         signInUser(email, password)
//             .then(result => {
//                 setError('')
//                 toast.success('Logged in successfully!')
//                 navigate(location.state?.from || '/')
//             })
//             .catch(error => {
//                 if (error.code === 'auth/invalid-credential') {
//                     setError('Email or password did not match! Please try again.')
//                 } 
//                 else if (error.code === 'auth/invalid-email') {
//                     setError('Please enter a valid email address.')
//                 }
//                 else if (error.code === 'auth/user-not-found') {
//                     setError('No account found with this email.')
//                 }
//                 else {
//                     setError('Something went wrong. Please try again later.')
//                 }
//             });
//     }

//     const handleGoogleSignIn = () => {
//         googleSignIn()
//             .then(result => {
//                 setUser(result.user)
//                 toast.success('Logged in with Google successfully!');
//                 navigate(location.state?.from || '/')
//             })
//             .catch(error => {
//                 toast.error(error.message);
//             })
//     }

//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <div className="w-[50vw] pb-3 rounded-[0.7rem] overflow-hidden shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
//                 <h2 className="text-3xl font-bold text-center pt-6"> Login to <span className="text-gradient">TravelEase</span></h2>
//                 <div className="card-body text-gray-800 dark:text-gray-100">
//                     <form onSubmit={ handleLogin }>
//                         <fieldset className="fieldset">
//                             <label className="label text-gray-700 dark:text-gray-300 ">Email address</label>
//                             <input name="email"  type="email" className="input bg-gray-50 dark:bg-gray-700 w-full" placeholder="Enter your email address"  />

//                             <div className="relative">
//                                 <label className="label mb-[0.38rem] mt-2 text-gray-700 dark:text-gray-300">Password</label>
//                                 <input name="password" type={ show ? "text" : "password" } className="input bg-gray-50 dark:bg-gray-700 w-full" placeholder="Enter your password" />
//                                 <span onClick={()=> setShow(!show) } className="absolute text-[1rem] right-4 top-[2.77rem] cursor-pointer z-50 " > { show ? <FaEye/> : <IoEyeOff/> }  </span>
//                             </div>

//                             { error && <p className='text-red-500 text-[0.8rem]'> {error} </p> }

//                             <div className="flex justify-end text-sm">  <Link className="text-gradient"> Forgot Password?</Link></div>

//                             <button type="submit" className="btn-primary-w-full mt-4">Login</button>
//                         </fieldset>
//                     </form>
//                     <p className="text-gray-500 dark:text-gray-400 text-center"> Don’t have an account?{" "} <Link to="/register" className="text-gradient font-medium"> Sign Up </Link></p>

//                     <div className="flex items-center gap-3 ">
//                         <hr className="flex-1 border-gray-200" />
//                         <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
//                         <hr className="flex-1 border-gray-200" />
//                     </div>

//                     <button onClick={handleGoogleSignIn} className="btn w-full bg-white text-black rounded-md border border-[#e5e5e5] flex items-center justify-center gap-2"> <FcGoogle size={18}/>Login with Google</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthProvider";

const Login = () => {
  const { signInUser, googleSignIn, setUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

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

  // Demo credentials autofill (React Hook Form way)
  const fillDemoCredentials = () => {
    setValue("email", "ishfak@gmail.com");
    setValue("password", "123456Aa");
    toast.info("Demo credentials filled!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[50vw] pb-3 rounded-[0.7rem] overflow-hidden shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center pt-6">
          Login to <span className="text-gradient">TravelEase</span>
        </h2>
        <div className="card-body text-gray-800 dark:text-gray-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* Email */}
              <label className="label text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="input bg-gray-50 dark:bg-gray-700 w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}

              {/* Password */}
              <div className="relative">
                <label className="label mb-[0.38rem] mt-2 text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input bg-gray-50 dark:bg-gray-700 w-full"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute text-[1rem] right-4 top-[2.77rem] cursor-pointer z-50"
                >
                  {show ? <FaEye /> : <IoEyeOff />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
              )}

              {/* Forgot + Demo */}
              <div className="flex justify-between items-center text-sm mt-2">
                <Link className="text-gradient">Forgot Password?</Link>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-xs px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Use Demo Credentials
                </button>
              </div>

              <button type="submit" className="btn-primary-w-full mt-4">
                Login
              </button>
            </fieldset>
          </form>

          <p className="text-gray-500 dark:text-gray-400 text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-gradient font-medium">
              Sign Up
            </Link>
          </p>

          <div className="flex items-center gap-3 mt-6">
            <hr className="flex-1 border-gray-200" />
            <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="btn w-full bg-white text-black rounded-md border border-[#e5e5e5] flex items-center justify-center gap-2 mt-4"
          >
            <FcGoogle size={18} />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
