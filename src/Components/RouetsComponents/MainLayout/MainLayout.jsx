import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import { WishListContext } from '../../../Context/WishListCOntext'
import { cartCounterContext } from '../../../Context/cartCounterContext'

export default function MainLayout() {
  let {getUserCart,setCartCount} = useContext(cartCounterContext)
  let {getUserWishList} = useContext(WishListContext)
  localStorage.removeItem('resetPasswordViaEmail')
   useEffect(()=> {
    
    (async()=>{
      let userData =await getUserCart();
      if(userData?.data?.status === 'success'){
        setCartCount(userData.data.numOfCartItems)
      }
      await getUserWishList()
    })()
  },[])
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}
