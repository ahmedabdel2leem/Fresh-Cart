import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from 'react-loading';
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";
export default function Brands() {
  // state to recives the data
  const [allbrands, setAllbrands] = useState(null)
  useEffect(()=>{
    // self invoked funciton 
    (()=>{axios.get('https://ecommerce.routemisr.com/api/v1/brands').then(res=>{
        return setAllbrands(res);
      }).catch(err=>{
        setAllbrands(null)
        console.log(err)
      })})
      ()
  },[])
  if(!allbrands)return ( <div
  className="d-flex justify-content-center align-items-center"
  style={{ height: "70vh" }}
>
  <Loading color="#0aad0a" type="spin"/>
</div>)
  return<>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <section id='categories '>
      <div className="container mt-5">
        <div className="row g-4">
          {allbrands.data.data.map(item=><div key={item._id} className="col-md-3">
            <Link to={`/brand/${item._id}`}>
            <div className="brand text-center">
              <img src={item.image} className='w-100' alt="" />
              <h4 className='fw-bold'>{item.name}</h4>
            </div>
            </Link>
          </div>)}
        </div>
      </div>
    </section>

    </>
  
}
