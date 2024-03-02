import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function VerifyCode() {
    const [code, setCode] = useState('')
    const navigate  =useNavigate()
    const handleSubmit =()=>{
      return axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{email:localStorage.getItem('resetPasswordViaEmail')})
      .then(()=>{
          toast.success('code has been resend again')
      })
      .catch(err=>{
          console.log('we coudlnt send it again ')
          })
  }
    const handelCode = ()=>{
        return axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{resetCode:code}).then((response)=>{
            toast.success('you inserted the right code');
            navigate('/resetpassword')
        }).catch(err=>{
            toast.error('the code you enterd is not valid or  expired ')
        })
    }
  return (
    <><div className="container">
        
      <label htmlFor="email">Reset code : </label>
        <input  className='form-control mb-3' onChange={({target})=>setCode(target.value.trim())}  type="text" name='text' id='text' />
  <button onClick={handelCode} className='btn bg-main text-white'>Submit</button>
<button onClick={handleSubmit} className='btn border-0 text-decoration-underline ms-3'>send code again</button>
    </div>
    </>
  )
}
