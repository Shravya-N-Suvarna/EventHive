import React from 'react'
import { useAuth } from '../context/AuthProvider'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export default function Logout() {
    const navigate = useNavigate()
    const [authUser,setAuthUser]=useAuth()
    const handleLogout=()=>{
        try{
            setAuthUser({
                ...authUser,
                user:null
            })
        localStorage.removeItem("Users");
            toast.success("Logout Successfully");
            setTimeout(() =>{
                window.location.reload();
            },1000);
            navigate("/home")
            
        }catch(error){
            toast.error("Error:" +error.message);
            setTimeout(() => {},2000)
        }
    };
  return (
    <div className="flex justify-center items-center h-full">
        <button className='px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50'
        onClick={handleLogout}>Logout</button>
    </div>
  )
}
