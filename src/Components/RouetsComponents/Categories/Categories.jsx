
import React, { useContext, useEffect, useState } from 'react'
import Category from '../../Childrens/Category/Category'
import Loading from 'react-loading';
import { cartCounterContext } from './../../../Context/cartCounterContext';
import {Helmet} from "react-helmet";
export default function Categories() {
  const {getAllCategories} = useContext(cartCounterContext);
  const [categories, setCategories] = useState(null)
  const  handelCategories = async()=>{
    let data = await getAllCategories();
    if(data.status == 200 ){
      setCategories(data)
    }
}
  useEffect(()=>{
    handelCategories()
  },[])
  if(!categories)return  ( <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "70vh" }}
  >
    <Loading color="#0aad0a" type="spin"/>
  </div>)
  return <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <section >
      <div className="container mt-5">
        <div className="row g-5 text-center">
         {categories.data.data.map(item=><Category key={item._id} item={item} />)}
        </div>
      </div>
    </section>
    </>

}
