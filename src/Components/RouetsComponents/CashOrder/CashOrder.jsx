import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { cartCounterContext } from './../../../Context/cartCounterContext';
export default function CashOrder() {
    const [errMsg , setErrMsg] = useState('')
    const [loading,setLoading] =useState(true)
    const {setCartCount} = useContext(cartCounterContext)
    let navigate = useNavigate()
    let {id} = useParams();
   function submitForm(values){
    setLoading(false)
  axios.post('https://ecommerce.routemisr.com/api/v1/orders/'+id,{shippingAddress:values},{
    headers:{
        token:localStorage.getItem("token")
    }
  })
    .then((res)=>{
        setCartCount(null)
      toast.success('success payment',{autoClose:2000})
      setTimeout(()=>{navigate('/allorders')},3000)
    }).catch((error)=>{
    console.log(error)
      toast.success('faild payment',{autoClose:2000})
      setErrMsg(error.response.data?.errors.msg)
      setLoading(true)
    })
   }
  


  let  validationSchema= new Yup.object({

      details:Yup.string().required('details ius required'),
      city:Yup.string().required('city is required'),
      phone:Yup.string().required('phone is required').matches(/^(?:\+20|0)(1[0-2]|2|5)\d{8}$/)
    })
    let {dirty,touched,isValid,values,errors,handleChange,handleBlur,handleSubmit} = useFormik({
      initialValues:{
        details:'',
        phone:'',
        city:''
      },validationSchema,
      onSubmit:()=>{
        submitForm(values);
      }
    })
  
  return (
    <>
       <div className="container">
    <form onSubmit={handleSubmit}>
        <label htmlFor="details">Details : </label>
        <input  className='form-control mb-3'value={values.details} onChange={handleChange} onBlur={handleBlur} type="details" name='details' id='details' />
        {errors.details && touched.details ? <div className='alert alert-danger'>{errors.details}</div>: ''}
        <label htmlFor="city">City : </label>
        <input  className='form-control mb-3'value={values.city} onChange={handleChange} onBlur={handleBlur} type="text" name='city' id='city' />
        {errors.city && touched.city ? <div className='alert alert-danger'>{errors.city}</div>: ''}
        <label htmlFor="phone">Phone : </label>
        <input  className='form-control mb-3'value={values.phone} onChange={handleChange} onBlur={handleBlur} type="text" name='phone' id='phone' />
        {errors.phone && touched.phone ? <div className='alert alert-danger'>{errors.phone}</div>: ''}
        {errMsg ? <div className='alert alert-danger'>{errMsg}</div> : ''}
        <button disabled={!(dirty && isValid)}  type='submit' className='btn bg-main text-white'>{loading ? 'Update Data' : <i className='fa fa-spinner fa-spin'></i>}</button>
      </form>
      </div>
    </>
  )
}
