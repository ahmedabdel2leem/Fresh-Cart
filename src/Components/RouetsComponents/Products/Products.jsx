import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../Loading/Loading";
import { useQuery } from "react-query";
import Product from "../../Childrens/Product/Product";

export default function Products() {
  function getProducts(page) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=16&page=${page}`
    );
  }
const [pageNumber, setPageNumber] = useState(1)
const [serachTrem, setSerachTrem] = useState("");
  const { data, isLoading } = useQuery(["products",pageNumber], () => getProducts(pageNumber), {
    // refetchInterval: 300000,
    refetchOnMount: true,
  });


  // handelSearch
  const handelChange = (e) => {
    setSerachTrem(e.target.value);
  };
// filter based on the input value
  const filterdData = data?.data.data.filter((product) => {
    const filterdProduct = product.title.match(
      new RegExp(`${serachTrem}`, "gi")
    );
    return filterdProduct !== null;
  });


  if (isLoading) return <Loading />;
  return (
    <>
    <section id="products">
      <div className="form-floating mt-5 mb-3 m-auto w-50 m-auto">
        <input
          onChange={handelChange}
          type="text"
          className="form-control"
          name="productName"
          id="floatingInput"
          placeholder="Search"
        />
        <label htmlFor="floatingInput">Search</label>
      </div>
      <div className="container my-5">
        <div className="row">
          {filterdData.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </div>
      </div>

     <nav aria-label="...">
  <ul className="pagination  pagination-sm mx-auto">
  <li className="page-item">
      <a onClick={()=>setPageNumber(1)} className="page-link active" href="#products">
        1
      </a>
    </li>
    <li className="page-item">
      <a onClick={()=>setPageNumber(2)} className="page-link" href="#products">
        2
      </a>
    </li>
    <li className="page-item">
      <a onClick={()=>setPageNumber(3)} className="page-link" href="#products">
        3
      </a>
    </li>
  </ul>
</nav>

      </section>
    </>
  );
}
