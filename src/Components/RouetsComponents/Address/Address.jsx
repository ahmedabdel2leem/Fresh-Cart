import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Address() {
let {id} =useParams()
const [loading,setLoading] =useState(true)
let {handleSubmit,values,dirty,isValid,handleChange} = useFormik({
  initialValues:{
    details:'',
    phone:'',
    city:''
  },
  onSubmit:()=>{
  }
})
      console.log(id)
       function createOnlinePayment(values){
        setLoading(false)
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`,{shippingAddress:values},
        {
          headers:{
          token: localStorage.getItem('token')
        }}).then((data)=>{
          console.log(data)
          window.open(data.data.session.url,'_self')
        }).catch((error=>{
          console.log(error)
        }))

        setLoading(true)
      }


  return<>
  
      <form onSubmit={handleSubmit}>
        <label htmlFor="details">Details : </label>
        <textarea  className='form-control mb-3'value={values.details} onChange={handleChange}  type="text" name='details' id='details' ></textarea>
        <label htmlFor="phone">phone : </label>
        <input  className='form-control mb-3'value={values.phone} onChange={handleChange}  type="text" name='phone' id='phone' />
        <label htmlFor="city">city : </label>
        <input  className='form-control mb-3'value={values.city} onChange={handleChange}  type="text" name='city' id='city' />
        <button disabled={!(dirty && isValid)} onClick={()=>createOnlinePayment(values)}  type='submit' className='btn bg-main text-white'>{loading ? 'SignUp' : <i className='fa fa-spinner fa-spin'></i>}</button>

      </form>
    </>

}
