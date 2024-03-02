import React, { useContext, useEffect, useState } from "react";
import img1 from "../../../assets/images/slider-1.png";
import img2 from "../../../assets/images/slider-2.png";
import img3 from "../../../assets/images/slider-3.png";
import Slider from "react-slick";
import Products from './../Products/Products';
import { cartCounterContext } from "../../../Context/cartCounterContext";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";
export default function Home() {

 const {getAllCategories} = useContext(cartCounterContext);
 const [categories, setCategories] = useState([])
 const  handelCategories = async()=>{
      let data = await getAllCategories();
      if(data.status == 200 ){
        setCategories(data?.data.data)
      }
}

 useEffect(()=>{
      handelCategories()
  },[])

  var settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2200,
    arrows:false
  };
  var catSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2200,
    arrows:false
  };
  return (
    <>
    {/* first part  */}

      <div className="container">
        <div className="row g-2">
          <div className="col-md-9">
            <Slider {...settings}>
                <img src={img1} alt="" />
    
                <img src={img2} alt="" />
             
                <img src={img3} alt="" />
              
            </Slider>
          </div>
          <div className="col-md-3 d-none d-md-block">
            <div className="sideImages h-100">
              <div className="row g-0 h-100">
              <div className="col-md-12">
                  <img  className='w-100 h-50'src={img2} alt="" />
                  <img  className='w-100 h-50'src={img1}alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* categories SLider */}
      <div className="container  mt-5">
        <h1 className="mb-3 ">Categories :</h1>
          <div className="row ">
          <Slider {...catSettings}>
            {categories.map((item)=>{
              return <div key={item._id} className="col-md-4 text-center ">
                <Link to={'/category/'+item._id}>
                <img  className="w-100" height={300} src={item.image} alt={item.slug} />
                </Link>
              <h6 className="fw-bolder pt-3">{item.name}</h6>
              </div>
            })}
          </Slider>
          </div>
      </div>

      {/*  products table */}
      <Products/>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    </>
  );
}
