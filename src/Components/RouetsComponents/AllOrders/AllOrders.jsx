import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "react-loading";
import { Link } from "react-router-dom";

export default function AllOrders() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true)
  
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    (() => {
      
      axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((data) => {
         setisLoading(false)
      setData(data);
          
        }).catch((err) => {console.log(err) ; setisLoading(false);});
        // setisLoading(false)
    })();

  }, []);

  if(isLoading)return <div className="d-flex justify-content-center align-items-center"  style={{ height: "70vh" }}>
  <Loading color="#0aad0a" type="spin"/>
</div>

if(!data || data.data.length == 0) return<h1 className="empty text-main text-center mt-5 pt-5">YOU DIDN'T MAKE ORDER YET <span className="fs-5 text-decoration-underline"><Link to={'/products'}>SHOP NOW </Link></span> </h1>

  return (
    <>
      <div className="container mt-4">
        <div className="row g-4">
          {data?.data?.map((item) => {
            return (
              <div key={item._id} className="col-md-6 ">
                <div className="container p-0">
                  <div className="row">
                    {item?.cartItems.map((cartItem) => {
                      return (
                        <div key={cartItem._id} className="col-md-3">
                          <img
                            src={cartItem.product.imageCover}
                            className="w-100"
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="order bg-dark text-white p-3 ">
                  <h5>paymentMethod : {item.paymentMethodType}</h5>
                  <h5>OrderPrice:{item.totalOrderPrice}</h5>
                  <p>
                    this order is delevring on {item.shippingAddress.city} on
                    phoneNumber : {item.shippingAddress.phone}
                  </p>
                </div>
              </div>
                </div>
               
            );
          })}
        </div>
      </div>
    </>
  );
}
