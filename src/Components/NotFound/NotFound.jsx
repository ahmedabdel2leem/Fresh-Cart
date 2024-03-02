import React from 'react'
import errImg from '../../assets/images/error.svg'
export default function NotFound() {
  return <>
<div className="container">
      <img className='w-100' src={errImg} alt="404" />
      </div>
  </>
}
