import React from "react";
import ReactLoading from 'react-loading';
const Example = ({ type, color }) => (
<div className="container d-flex justify-content-center mt-5 align-items-center " style={{"height":"70vh"}}> 
<ReactLoading type={'spin'} color={'#0aad0a'} height={'5%'} width={'5%'}  />
</div>
);
export default Example;