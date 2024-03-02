import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ForgetPassword() {
const [email, setEmail] = useState('')
let  navigate = useNavigate()



const handleSubmit =()=>{
    return axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{email})
    .then((data)=>{
        toast.success(data.data.message)
        localStorage.setItem('resetPasswordViaEmail',email)
        navigate('/verfiycode')
    })
    .catch(err=>{
        toast.error('sorry thats email dosnt exist')
        })
}
  return <>
  <div className="container">
  <label htmlFor="email">E-mail : </label>
        <input  className='form-control mb-3' onChange={({target})=>setEmail(target.value)}  type="email" name='email' id='email' />
  <button disabled={!email} onClick={handleSubmit} className='btn bg-main text-white'>Submit</button>
  </div>
 
    </>

}
