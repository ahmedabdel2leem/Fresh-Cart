import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../Loading/Loading";
import { toast } from "react-toastify";
import { WishListContext } from "../../../Context/WishListCOntext";
import { cartCounterContext } from './../../../Context/cartCounterContext';
export default function ProductDetails() {
  let x = useParams();

  const {addToCart,setCartCount} = useContext(cartCounterContext);
  const {  addToWishList,
    getUserWishList,
    wishList,
    removeItemFromWishList,} = useContext(WishListContext);
  const [heart, setHeart] = useState(false);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
 let [isBtnLoading, setIsBtnLoading] = useState(true)
  async function getProducDetails() {
    setLoading(false);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${x.id}`
      );

      setProduct(data?.data);
      for (let i = 0; i < wishList?.length; i++) {
        if (wishList[i] && data.data.id === wishList[i]._id) {
            // Update state based on the condition
            setHeart(true);
            // Break the loop if the condition is met to update state only once
            break;
        }
    }
      setLoading(true);
    }

    async function addItemToCart(id) {
      setIsBtnLoading(false)
      let {data} = await addToCart(id);
      if(data?.status === 'success'){
          toast.success('Product added successfully to your cart')
          setIsBtnLoading(true)
          setCartCount(data.numOfCartItems)
      }
      
    }


    async function handelAddToWishList(productId) {
      setIsLoading(false);
      // add product
      let { data } = await addToWishList(productId);
      if (data.status == "success") {
        setHeart(true);
        toast.success(data.message);
        await getUserWishList();
      }
      setIsLoading(true);
      
    }
  
  
  
    // remove item from wishlist
    async function handelRemoveFromWishList(productId) {
      setIsLoading(false);
      // add product
      let data = await removeItemFromWishList(productId);
      if (data.data.status == "success") {
        setHeart(false);
        toast.error(data.data.message);
         // update the wish list on add product
         await getUserWishList();
      }
      setIsLoading(true);
    }
  
    useEffect(() => {
      getProducDetails();
    }, [wishList]);
  if (!loading) return <Loading />;
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <img src={product.imageCover} className="w-100" alt="" />
          </div>
          <div className="col-md-9 d-flex flex-column justify-content-between">
            <div>
              <h4>{product.title}</h4>
              <p className="my-3 ">{product.description}</p>
              <span>{product.category?.name}</span>
            <div className="left">
            <div className="d-flex justify-content-between">
                <div className="price">{product.price} EGP</div>
                {!heart ? (
               <button disabled={!isLoading} className="btn border-0 p-0 m-0">
              <i
                onClick={() => handelAddToWishList(product._id)}
                className="fa-regular fa-heart fs-3 cursor-pointer"
              ></i>
              </button>
            ) : (
             <button disabled={!isLoading} className="btn border-0 p-0 m-0">
               <i 
                onClick={() => handelRemoveFromWishList(product._id)}
                className="fa-solid fa-heart text-danger fs-3 cursor-pointer"></i>
             </button>
            )}
               
            </div>
            <div className="rating">
                  <i className="fa-solid fa-star rating-color"></i>
                  {product.ratingsAverage}
                </div>
              </div>
            </div>
            <button   onClick={() => {addItemToCart(product?.id);}} className="w-100 btn bg-main text-white mt-5">
            {isBtnLoading?'Add to Cart':<i className='fa fa-spinner fa-spin'></i>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
