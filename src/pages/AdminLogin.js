// AdminLogin.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiUser } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await fetch('http://localhost:4001/admin/admin_login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Login Successfully");
      const userData = await response.json();
      if (rememberMe) {
        localStorage.setItem("Admin", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("Admin", JSON.stringify(userData));
      }
      navigate('/admindashboard', { replace: true });
    } else {
      toast.error("Invalid admin credentials");
    }
  };

  return (
    <div className='flex flex-col items-center p-8 bg-gradient-to-r from-pink-300 to-blue-200 rounded-lg  shadow-custom-blue w-full max-w-lg border-2 border-blue-900'>
      <h1 className='text-3xl text-blue-900 font-bold mb-6'>Admin Login</h1>
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
        </div>
        <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="w-full md:w-3/4 h-12 px-6 py-2 border-blue-900  bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
        Login
      </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
