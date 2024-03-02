import axios from "axios";
import React, {  useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import Loading from "react-loading";
import Brand from "../Brand/Brand";

export default function BrandDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const getbrand = () => {
    setLoading(false);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(true);
  };


  useEffect(() => {
    getbrand();
  }, []);

  if (!loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Loading color="#0aad0a" type="spin" />
      </div>
    );
  if (product && product.data.results == 0)
    return (
      <h1 className="text-center text-main mt-5">
        Sorry theres no product for this Brand
      </h1>
    );
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {product?.data.data.map((item) => (
         <Brand item={item} key={item._id}/>
          ))}
        </div>
      </div>
    </>
  );
}
