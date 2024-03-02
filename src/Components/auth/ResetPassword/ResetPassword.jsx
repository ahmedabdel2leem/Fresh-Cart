import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ResetPassword() {
  const navigate = useNavigate()
  // handel the value and the type
const [[password,type], setPassword] = useState([null,'password'])

  const handelReset =()=>{  
    return axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
      email: localStorage.getItem('resetPasswordViaEmail'),
      newPassword:password
    })
    .then((response)=>{
      // localStorage.removeItem(resetPasswordViaEmail);
      if(password == null)return
      localStorage.setItem('token', response.data.token)
      navigate('/home')
      alert("Your Password has been reset Success");
      console.log(response)
    }).catch((err)=>{
      toast.error('your password is weak')
    })
  }
  return <>
  <div className="container mt-5">
        <label htmlFor="email">newPassword : </label>
        <div className='reset-password position-relative '>
        <input className='form-control mb-3 ' onChange={({target})=>setPassword([target.value,target.type])} type={type}  name='email' id='email' />
        { password && type == 'password' ?<i onClick={()=>setPassword(password,'text')} class="fa-solid fa-eye "></i> 
        :<i onClick={()=>setPassword([password,'password'])} class="fa-solid fa-eye-slash"></i>}

        </div>
        <button onClick={handelReset} className='btn bg-main text-white'>ResetPassword</button>
        </div>
    </>
  
}
