import React from 'react'
import { Link } from 'react-router-dom';

export default function Category({item}) {
  return (
    <>
         <div className="col-md-3 ">
            <div className="category" >
              <Link to={'/category/'+item._id}>
              <img src={item.image} className='w-100' alt="" /></Link>
              
              <h4 className='fw-bold'>{item.name}</h4>
            </div>
            </div>
    </>
  )
}
