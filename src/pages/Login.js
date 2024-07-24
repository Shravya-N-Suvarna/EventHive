import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Login({ onShowRegister }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post('http://localhost:4001/user/login', userInfo);
      if (res.data) {
        toast.success("Login Successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        navigate(from, { replace: true });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-pink-300 to-blue-200 rounded-lg shadow-custom-blue w-full max-w-lg border-2 border-blue-900">
      <h1 className="text-3xl text-blue-900 font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <div className='relative my-4'>
          <input
            type="email"
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
            className="block w-full h-12 py-2 px-4 text-sm text-blue-900 font-bold border border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Email"
          />
          <BiUser className='absolute top-3 right-4 text-blue-900' />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>
        <div className='relative my-4'>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            className="block w-full h-12 py-2 px-4 text-sm text-blue-900 font-bold border border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
          <span onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-4 text-blue-900 cursor-pointer">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
        </div>
        <div className='flex items-center justify-between mb-4'>
          <label className='inline-flex items-center text-sm text-blue-900'>
            <input
              type="checkbox"
              className="form-checkbox text-blue-500 h-4 w-4"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className='ml-2 font-bold'>Remember me</span>
          </label>
          <Link to='' className="text-blue-600 hover:underline">Forgot Password?</Link>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-full h-12 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </div>
        <div className="text-center mt-4">
          <span className="text-blue-900">
            New Here? 
            <button onClick={onShowRegister} className="text-blue-600 hover:underline">
              Create an Account
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}
