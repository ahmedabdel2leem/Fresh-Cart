import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
export default function UpdateUserData() {
    const [errMsg , setErrMsg] = useState('')
    const [loading,setLoading] =useState(true)
    let navigate = useNavigate()
   
   function submitForm(values){
    setLoading(false)
  axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe',values,{
    headers:{
        token:localStorage.getItem("token")
    }
  })
    .then((res)=>{
      toast.success('The data jas been updated succussfully',{autoClose:2000})
      setTimeout(()=>{navigate('/home')},3000)
    }).catch((error)=>{
        console.log(error)
      toast.success(error.response.data?.errors.msg,{autoClose:2000})
      setErrMsg(error.response.data?.errors.msg)
      setLoading(true)
    })
  
   }
  
  let  validationSchema= new Yup.object({

      email:Yup.string().required('Email ius required').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'please insert a valid regex'),
      name:Yup.string().required('Name ius required').min(3,'more than 3 letters').max(20,'max letters is 20'),
      phone:Yup.string().required('phone is required').matches(/^(?:\+20|0)(1[0-2]|2|5)\d{8}$/)
    })
    let {dirty,touched,isValid,values,errors,handleChange,handleBlur,handleSubmit} = useFormik({
      initialValues:{
        email:'',
        name:'',
        phone:''
      },validationSchema,
      onSubmit:()=>{
        submitForm(values);
      }
    })
  
  return <>
  <div className="container">
    <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail : </label>
        <input  className='form-control mb-3'value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" name='email' id='email' />
        {errors.email && touched.email ? <div className='alert alert-danger'>{errors.email}</div>: ''}
        <label htmlFor="name">name : </label>
        <input  className='form-control mb-3'value={values.name} onChange={handleChange} onBlur={handleBlur} type="text" name='name' id='name' />
        {errors.name && touched.name ? <div className='alert alert-danger'>{errors.name}</div>: ''}
        <label htmlFor="phone">Phone : </label>
        <input  className='form-control mb-3'value={values.phone} onChange={handleChange} onBlur={handleBlur} type="text" name='phone' id='phone' />
        {errors.phone && touched.phone ? <div className='alert alert-danger'>{errors.phone}</div>: ''}
        {errMsg ? <div className='alert alert-danger'>{errMsg}</div> : ''}
        <button disabled={!(dirty && isValid)}  type='submit' className='btn bg-main text-white'>{loading ? 'Update Data' : <i className='fa fa-spinner fa-spin'></i>}</button>
      </form>
      </div>
  </>
}
