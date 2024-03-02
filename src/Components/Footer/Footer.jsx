import React from 'react'
export default function Footer() {

  return <>
      <footer className='bg-dark mt-5 pt-5'>
        <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-white">
          <h1>Get top deals, latest trends, and more.</h1>
         <p>Join our email subscription now to get updates on promotions and coupons.</p>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-end flex-column ">
              <input type="text" className='form-control' />
              <button className='btn bg-main text-white mt-3'>signup</button>
            </div>
          </div>
        </div>
        </div>
      </footer>
    </>
}
