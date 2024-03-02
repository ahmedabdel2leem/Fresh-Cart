import axios from 'axios';
import { useFormik } from 'formik'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import {Helmet} from "react-helmet";
export default function Signin() {
  const [errMsg , setErrMsg] = useState('')
  const [loading,setLoading] =useState(true)
  let navigate = useNavigate()
 
 function submitForm(values){
  setLoading(false)
axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
  .then(({data})=>{
    localStorage.setItem('token',data.token)
    navigate('/home')
  }).catch((error)=>{
    setErrMsg(error.response.data?.message)
    setLoading(true)
  })

 }

let  validationSchema= new Yup.object({
    email:Yup.string().required('Email ius required').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'please insert a valid regex'),
    password:Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'Minimum eight characters, at least one letter and one number'),
   })
  let {dirty,touched,isValid,values,errors,handleChange,handleBlur,handleSubmit} = useFormik({
    initialValues:{
      email:'',
      password:''
    },validationSchema,
    onSubmit:()=>{
      submitForm(values);
    }
  })


return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Sign In</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail : </label>
        <input  className='form-control mb-3'value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" name='email' id='email' />
        {errors.email && touched.email ? <div className='alert alert-danger'>{errors.email}</div>: ''}
        <label htmlFor="password">Password : </label>
        <input  className='form-control mb-3'value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" name='password' id='password' />
        {errors.password && touched.password ? <div className='alert alert-danger'>{errors.password}</div>: ''}
        {errMsg ? <div className='alert alert-danger'>{errMsg}</div> : ''}
        <button disabled={!(dirty && isValid)}  type='submit' className='btn bg-main text-white'>{loading ? 'Log In' : <i className='fa fa-spinner fa-spin'></i>}</button>
      </form>
  </>
}
