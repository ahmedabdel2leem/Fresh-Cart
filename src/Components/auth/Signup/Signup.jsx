import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function Signup() {
  const [errMsg , setErrMsg] = useState('');
  const [loading , setLoading] =useState(true)
  let navigate = useNavigate()
 function submitForm(values){
  setLoading(false)
 axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
  .then(()=>{
    navigate('/signin')
  }).catch((error)=>{
    console.log(error.response.data.message)
    setErrMsg(error.response.data.message)
    setLoading(true)
  
  })
 }

let  validationSchema= new Yup.object({
    name:Yup.string().required('Name ius required').min(3,'more than 3 letters').max(20,'max letters is 20'),
    email:Yup.string().required('Email ius required').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'please insert a valid regex'),
    password:Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'Minimum eight characters, at least one letter and one number'),
    rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')],'password is not matches'),
    phone:Yup.string().required('phone is required').matches(/^(?:\+20|0)(1[0-2]|2|5)\d{8}$/)
   })
  let {dirty,touched,isValid,values,errors,handleChange,handleBlur,handleSubmit } = useFormik({
    initialValues:{
      name: '',
      email:'',
      password:'',
      rePassword:'',
      phone : ''
    },validationSchema,
    onSubmit:()=>{
      submitForm(values);
    }
  })

  return <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name : </label>
        <input className='form-control mb-3' value={values.name} onChange={handleChange} onBlur={handleBlur} type="text" name='name' id='name' />
        {errors.name && touched.name ? <div className='alert alert-danger'>{errors.name}</div>: ''}
        
        <label htmlFor="email">E-mail : </label>
        <input  className='form-control mb-3'value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" name='email' id='email' />
        {errors.email && touched.email ? <div className='alert alert-danger'>{errors.email}</div>: ''}
        
        <label htmlFor="password">Password : </label>
        <input  className='form-control mb-3'value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" name='password' id='password' />
        {errors.password && touched.password ? <div className='alert alert-danger'>{errors.password}</div>: ''}
        
        <label htmlFor="rePassword">rePassword : </label>
        <input  className='form-control mb-3'value={values.rePassword} onChange={handleChange} onBlur={handleBlur} type="password" name='rePassword' id='rePassword' />
        {errors.rePassword && touched.rePassword ? <div className='alert alert-danger'>{errors.rePassword}</div>: ''}
       
        <label htmlFor="phone">Phone : </label>
        <input  className='form-control mb-3'value={values.phone} onChange={handleChange} onBlur={handleBlur} type="text" name='phone' id='phone' />
        {errors.phone && touched.phone ? <div className='alert alert-danger'>{errors.phone}</div>: ''}
        {errMsg? <div className='alert alert-danger'>{errMsg}</div> :''}
        <button disabled={!(dirty && isValid)}  type='submit' className='btn bg-main text-white'>{loading ? 'SignUp' : <i className='fa fa-spinner fa-spin'></i>}</button>
      </form> 
    </>

}
