import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Register({ onShowLogin }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post('http://localhost:4001/user/register', userInfo);
      if (res.data) {
        toast.success("Registered Successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        // Redirect to home or show a success message
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-pink-300 to-blue-200 rounded-lg shadow-custom-blue w-full max-w-lg border-2 border-blue-900">
      <h1 className="text-3xl text-blue-900 font-bold mb-6 text-center">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <div className='relative my-4'>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="block w-full h-12 py-2 px-4 text-sm text-blue-900 font-bold border border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
          />
          <BiUser className='absolute top-3 right-4 text-blue-900' />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
        </div>
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
        <div className='relative my-4'>
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: value => value === watch('password') || "Passwords do not match"
            })}
            className="block w-full h-12 py-2 px-4 text-sm text-blue-900 font-bold border border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm Password"
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-3 right-4 text-blue-900 cursor-pointer">
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-full h-12 px-6 py-2 border-blue-900 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Register
          </button>
        </div>
        <div className="text-center mt-4">
          <span className="text-blue-900">
            Already have an account? 
            <button onClick={onShowLogin} className="text-blue-600 hover:underline">
              Login
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}
