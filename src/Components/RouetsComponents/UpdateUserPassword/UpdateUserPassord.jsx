import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import {Helmet} from "react-helmet";
export default function UpdateUserPassord() {
  const [errMsg , setErrMsg] = useState('')
    const [loading,setLoading] =useState(true)
    let navigate = useNavigate()
   
   function submitForm(values){
    setLoading(false)
  axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',values,{
    headers:{
        token:localStorage.getItem("token")
    }
  })
    .then((res)=>{
      toast.success('Your Password has been changed succussfully' ,{autoClose: 2000})
      setTimeout(()=>{navigate('/home')},3000)
    }).catch((error)=>{
      toast.error(error.response.data?.message , {autoClose: 2000})
      console.log(error)
      setErrMsg(error.response.data?.message)
      setLoading(true)
    })
  
   }
  
  let  validationSchema= new Yup.object({

    currentPassword:Yup.string().required('currentPassword is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'Minimum eight characters, at least one letter and one number'),
      password:Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'Minimum eight characters, at least one letter and one number'),
      rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')],'password is not matches'),
    })
    let {dirty,touched,isValid,values,errors,handleChange,handleBlur,handleSubmit} = useFormik({
      initialValues:{
        currentPassword:'',
        password:'',
        rePassword:''
      },validationSchema,
      onSubmit:()=>{
        submitForm(values);
      }
    })
  
  return <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Update Password</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <div className="container">
    <form onSubmit={handleSubmit}>
        <label htmlFor="currentPassword">Current Password : </label>
        <input  className='form-control mb-3'value={values.currentPassword} onChange={handleChange} onBlur={handleBlur} type="password" name='currentPassword' id='currentPassword' />
        {errors.currentPassword && touched.currentPassword ? <div className='alert alert-danger'>{errors.currentPassword}</div>: ''}
        <label htmlFor="password">New Password : </label>
        <input  className='form-control mb-3'value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" name='password' id='password' />
        {errors.password && touched.password ? <div className='alert alert-danger'>{errors.password}</div>: ''}
        <label htmlFor="phone">rePassword : </label>
        <input  className='form-control mb-3'value={values.rePassword} onChange={handleChange} onBlur={handleBlur} type="password" name='rePassword' id='rePassword' />
        {errors.rePassword && touched.rePassword ? <div className='alert alert-danger'>{errors.rePassword}</div>: ''}
        {errMsg ? <div className='alert alert-danger'>{errMsg}</div> : ''}
        <button disabled={!(dirty && isValid)}  type='submit' className='btn bg-main text-white'>{loading ? 'Change Password' : <i className='fa fa-spinner fa-spin'></i>}</button>
      </form>
      </div>
  </>
}
