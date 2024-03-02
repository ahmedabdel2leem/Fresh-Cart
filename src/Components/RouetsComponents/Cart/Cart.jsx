import React, { useContext, useEffect, useState } from "react";
import Loading from "react-loading";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import { Link, NavLink } from "react-router-dom";
import { cartCounterContext } from './../../../Context/cartCounterContext';
import {Helmet} from "react-helmet";
export default function Cart() {
  // state & context
  let { setCartCount,getUserCart, deleteProduct ,updateQTY}  = useContext(cartCounterContext);
  let [cartItems, setCartItems] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  // delete items 
  async function handleDelete(id) {
    let data = await deleteProduct(id);
    
    if (data?.data.status === 'success') {
      toast.error('product Deleted Sucssfuily')
      setCartCount(data.data.numOfCartItems)
      setCartItems(data?.data.data)
    }
    if(data.data.numOfCartItems == 0){
      setCartItems(null)
    }
  }

  // change quantity
  async function handleQTY(id, count) {
    let data = await updateQTY(id,count);
    if(count < 1)return handleDelete(id)
    if (data?.data.status === 'success') {
      toast.success('product Updated Sucssfuily')
      setCartCount(data.data.numOfCartItems)
      setCartItems(data?.data.data)
    }
  }

  // clear the cart
  async function clearCart(){
    setIsLoading(true)
    let {data} = await  axios.delete(baseUrl +'cart',{
      headers:{
        token : localStorage.getItem('token')
      }
    })
    if(data.message === 'success' ){
      setCartItems(null)
      setCartCount(0)
      setIsLoading(false)
    }
  }
  

  // handle reseved data
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      let  data  = await getUserCart();
      if(data.response?.data.statusMsg == 'fail' || data?.data.numOfCartItems== 0){
        setCartItems(null);
      }else{
        setCartItems(data?.data?.data);
      }
      setIsLoading(false)
    })();
  }, []);


  // loading and empty cart 
  if(isLoading)return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <Loading color="#0aad0a" type="spin"/>
    </div>
  );
  if(cartItems == null ){
    return <h1 className="empty text-main text-center mt-5 pt-5">YOUR CART IS EMPTY  <span className="fs-5 text-decoration-underline"><Link to={'/products'}>SHOP NOW </Link></span></h1>
  }


  return (
    <>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <div className="container-fluid bg-main-light p-4 pb-5">
        <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1>Shop Cart:</h1>
          <p className="text-main">
            Total Cart Price: {cartItems.totalCartPrice}
          </p>
        </div>
        <div>
          <NavLink to={`/address/${cartItems._id}`} className="btn bg-main mx-2 text-white">Bay Online</NavLink>
          <NavLink to={`/cashorder/${cartItems._id}`} className="btn bg-main text-white">Bay Cash</NavLink>
        
        </div>
        </div>

        {cartItems.products &&
          cartItems.products.map((item) => {
            return (
              <div key={item.product._id} className="row border-bottom py-3">
                <div className="col-md-1">
                  <img src={item.product.imageCover} className="w-100" alt="" />
                </div>
                <div className="col-md-11 align-items-center d-flex">
                  <div className="d-flex justify-content-between w-100">
                    <div>
                      <h6 className="fw-bold decraption-wrap">{item.product.title}</h6>
                      <p className="text-main fw-bold">Price : {item.price}</p>
                      <span className="cursor-pointer" onClick={() => handleDelete(item.product._id)}><i className="fa-solid fa-trash-can text-main"></i> Remove</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <button  disabled={item.count >= item.product.quantity} onClick={()=>handleQTY(item.product._id,item.count+1)} className="btn brdr">+</button>
                      <span className="mx-3">{item.count}</span>
                      <button disabled={item.count <= 1}  onClick={()=>handleQTY(item.product._id,item.count-1)} className="btn brdr">-</button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
          <button className="btn btn-danger text-end mt-3" onClick={clearCart}>Clear Cart</button>
      </div>
    </>
  );
}
