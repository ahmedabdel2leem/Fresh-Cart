import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "../utils/baseUrl";

export const cartCounterContext = createContext();

export default function CounterContextProvider({ children }) {


    const [cartCount, setCartCount] = useState(0);
   

    // Get all Categories
   function  getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories?limit=20').then(data=>data).catch(err=>err)
   }

    // carts functions 
// add to cart 
function addToCart(id) {
    return axios.post(`${baseUrl}cart`, { productId: id }, {
        headers: {
            token: localStorage.getItem('token')
        }
    }).then((data) => data).catch(err => err)
}
// get the cart
function getUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
            token: localStorage.getItem('token')
        }
    }).then((data) => {
        localStorage.setItem('userId',data.data.data.cartOwner)
        return data
    }).catch(err => err)
}
// delete items  form cart
function deleteProduct(productId) {
    return axios.delete(`${baseUrl}cart/${productId}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    }).then((data) => data).catch(err => err)
}

const updateQTY = (productId, count) => {
    return axios.put(baseUrl + 'cart/' + productId, { count }, {
        headers: {
            token: localStorage.getItem('token')
        }
    }).then((data) => data).catch((error) => error)
}







    return <cartCounterContext.Provider value={{ getAllCategories,cartCount, setCartCount, addToCart, getUserCart, deleteProduct, updateQTY}}>
        {children}
    </cartCounterContext.Provider>
}