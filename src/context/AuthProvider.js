import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios';

export const AuthContext=createContext()
export default function AuthProvider({children}) {
  const initialAuthUser = localStorage.getItem("Users");
  const [authUser,setAuthUser]=useState(
    initialAuthUser? JSON.parse(initialAuthUser) : undefined

  )
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:4001/user/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAuthUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);
  return(
    <AuthContext.Provider value={[authUser,setAuthUser]}>
        {children}
    </AuthContext.Provider>
  )

  
}
export const useAuth=()=>useContext(AuthContext);
