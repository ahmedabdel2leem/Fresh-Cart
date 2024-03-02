import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "react-loading";
import { WishListContext } from "../../Context/WishListCOntext";
import { cartCounterContext } from "../../Context/cartCounterContext";
import {Helmet} from "react-helmet";
export default function WishList() {
  const { addToCart, setCartCount } = useContext(cartCounterContext);
  const { removeItemFromWishList, wishList, getUserWishList, loadWishList } = useContext(WishListContext);
  const [isBtnLoading, setIsBtnLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // add product to cart
  async function addItemToCart(id) {
    setIsBtnLoading(false);
    let { data } = await addToCart(id);
    if (data?.status === "success") {
      toast.success("Product added successfully to your cart");
      setIsBtnLoading(true);
      setCartCount(data.numOfCartItems);
    }
  }

  // remove item from wishlist
  async function handelRemoveFromWishList(productId) {
    setIsLoading(false);
    // add product
    let data = await removeItemFromWishList(productId);
    if (data.data.status == "success") {
      toast.error(data.data.message);
      // update the wish list on add product
      await getUserWishList();
    }
    setIsLoading(true);
  }
  if (loadWishList)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Loading color="#0aad0a" type="spin" />
      </div>
    );

  if (!wishList || wishList.length == 0)
    return (
      <h1 className="empty text-main text-center mt-5 pt-5">
        YOUR WISH LIST IS EMPTY{" "}
        <span className="fs-5 text-decoration-underline">
          <Link to={"/products"}>SHOP NOW </Link>
        </span>
      </h1>
    );

  return (
    <>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Wish List</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <div className="container">
        <div className="row">
          {wishList.map((item) => {
            return (
              <div key={item._id} className="col-md-3">
                <div className="product  rounded-3 p-3">
                  <Link to={`/product-details/${item._id}`}>
                    <img
                      src={item?.imageCover}
                      className="w-100 cursor-pointer"
                      alt=""
                    />
                  </Link>
                  <span className="text-main font-sm">
                    {item.category.name}
                  </span>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className=" my-2 fw-bold">
                      {item.title.split(" ").slice(0, 2).join(" ")}
                    </h6>
                    <button
                      disabled={!isLoading}
                      className="btn border-0 p-0 m-0"
                    >
                      <i
                        onClick={() => handelRemoveFromWishList(item._id)}
                        className="fa-solid fa-heart text-danger  cursor-pointer"
                      ></i>
                    </button>
                  </div>
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
                    className="btn addBtn bg-main w-100 text-white py-2 mt-2"
                  >
                    {isBtnLoading ? (
                      "Add to Cart"
                    ) : (
                      <i className="fa fa-spinner fa-spin"></i>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
