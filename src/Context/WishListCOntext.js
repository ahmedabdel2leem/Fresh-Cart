import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from './../utils/baseUrl';

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {


    const [wishCount, setWishCount] = useState(0);
    const [wishList, setWishList] = useState([])
    const [loadWishList, setLoadWishList] = useState(true)
   

// add o wishlist 
const addToWishList = (productId)=>{
   return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId},{
        headers:{
            token: localStorage.getItem('token')
        }
    }).then(res=>res).catch(err=>console.log(err))
}

const removeItemFromWishList =  (productId)=>{
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
         headers:{
             token: localStorage.getItem('token')
         }
     }).then(res=>res).catch(err=>console.log(err))
 }
function getUserWishList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
            token: localStorage.getItem('token')
        }
    }).then((data) => {
        setWishList(data?.data.data)
        setLoadWishList(false)
         setWishCount(data.data.count);
        // return data
    }).catch((err) => {
        console.log(err)
        setLoadWishList(false)
    })
}




    return <WishListContext.Provider value={{addToWishList,getUserWishList,wishList,setWishList,removeItemFromWishList,loadWishList,wishCount}}>
        {children}
    </WishListContext.Provider>
}