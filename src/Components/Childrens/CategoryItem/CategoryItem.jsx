
  import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { WishListContext } from './../../../Context/WishListCOntext';
import { cartCounterContext } from './../../../Context/cartCounterContext';

export default function CategoryItem({item}) {
    let { setCartCount, addToCart } = useContext(cartCounterContext);
    let { addToWishList,
      getUserWishList,
      wishList,
      removeItemFromWishList,} = useContext(WishListContext);
    let [isBtnLoading, setIsBtnLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [heart, setHeart] = useState(false);
    async function addItemToCart(id) {
        setIsBtnLoading(false);
        let { data } = await addToCart(id);
        if (data?.status === "success") {
        console.log(data);
        toast.success("Product added successfully to your cart");
        setIsBtnLoading(true);
        setCartCount(data.numOfCartItems);
        }
      }

        // add item to the wish list
  async function handelAddToWishList(productId) {
    setIsLoading(false);
    // add product
    let { data } = await addToWishList(productId);
    if (data.status == "success") {
      setHeart(true);
      toast.success(data.message);
      await getUserWishList();
      console.log(wishList)
    }
    setIsLoading(true);
    
  }


  async function handelRemoveFromWishList(productId) {
    setIsLoading(false);
    // add product
    let data = await removeItemFromWishList(productId);
    if (data.data.status == "success") {
      setHeart(false);
      toast.error(data.data.message);
       // update the wish list on add product
      await getUserWishList();
      console.log(wishList)
    }
    setIsLoading(true);
  }


  useEffect(()=>{
    for (let i = 0; i < wishList?.length; i++) {
      if (wishList[i] && item.id === wishList[i]._id) {
          // Update state based on the condition
          setHeart(true);
          console.log(wishList)
          // Break the loop if the condition is met to update state only once
          break;
      }
  }
  },[wishList,item])
  return (
    <>
      
      <div className="col-md-3">
              <div className="product cursor-pointer rounded-3 p-3">
                <Link to={`/product-details/${item._id}`}>
                  <img src={item?.imageCover} className="w-100" alt="" />
                  </Link>
                  <span className="text-main font-sm">
                    {item.category.name}
                  </span>
                  <h6 className=" my-2 fw-bold">
                    {item.title.split(" ").slice(0, 2).join(" ")}
                  </h6>
                  {!heart ? (
              <button disabled={!isLoading} className="btn border-0 p-0 m-0">
              <i
                onClick={() => handelAddToWishList(item._id)}
                className="fa-regular fa-heart cursor-pointer"
              ></i>
              </button>
            ) : (
            <button disabled={!isLoading} className="btn border-0 p-0 m-0">
              <i 
                onClick={() => handelRemoveFromWishList(item._id)}
                className="fa-solid fa-heart text-danger  cursor-pointer"></i>
            </button>
            )}
                  <div className="d-flex justify-content-between">
                    <div className="price">{item.price} EGP</div>
                    <div className="rating">
                      <i className="fa-solid fa-star rating-color"></i>
                      {item.ratingsAverage}
                    </div>
                  </div>

                <button
                  disabled={!isBtnLoading}
                  onClick={() => {
                    addItemToCart(item?.id);
                  }}
                  className="btn bg-main w-100 text-white py-2 mt-2"
                >
                  {isBtnLoading ? (
                    "Add to Cart"
                  ) : (
                    <i className="fa fa-spinner fa-spin"></i>
                  )}
                </button>
              </div>
            </div>
    </>
  )
}
