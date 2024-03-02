import React from 'react'
import { Navigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
export default function ProtectedRoutes({children}) {
   
  const token  = localStorage.getItem('token')
    
    try {
      const decoded = jwtDecode(token);
      // console.log("test",decoded.id)
      localStorage.setItem('userId',decoded.id)
    } catch (error) {
      console.log(error)
      localStorage.clear()
       return <Navigate to="/signin"/>

    }
    if(token) return children
   

}
