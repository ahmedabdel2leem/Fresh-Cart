import './App.css';
// react router dom
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// routes
import MainLayout from './Components/RouetsComponents/MainLayout/MainLayout';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import Home from './Components/RouetsComponents/Home/Home';
import Cart from './Components/RouetsComponents/Cart/Cart';
import Products from './Components/RouetsComponents/Products/Products';
import Categories from './Components/RouetsComponents/Categories/Categories';
import Brands from './Components/RouetsComponents/Brands/Brands';
import WishList from './Components/WishList/WishList';
import Signin from './Components/auth/Signin/Signin';
import Signup from './Components/auth/Signup/Signup';
import AuthLayout from './Components/auth/AuthLayout';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/Childrens/ProductDetails/ProductDetails';
import { ToastContainer  } from 'react-toastify';
import Address from './Components/RouetsComponents/Address/Address';
import AllOrders from './Components/RouetsComponents/AllOrders/AllOrders';
import BrandDetails from './Components/Childrens/BrandDetails/BrandDetails'
import ForgetPassword from './Components/auth/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/auth/ResetPassword/ResetPassword';
import VerifyCode from './Components/auth/VerifyCode/VerifyCode';
import UpdateUserData from './Components/RouetsComponents/UpdateUserData/UpdateUserData';
import UpdateUserPassord from './Components/RouetsComponents/UpdateUserPassword/UpdateUserPassord';
import CashOrder from './Components/RouetsComponents/CashOrder/CashOrder';
import CategoriesItems from './Components/Childrens/CategoriesItems/CategoriesItems';
import WishListContextProvider from './Context/WishListCOntext';
import CounterContextProvider from './Context/cartCounterContext';
const myRoutes = createBrowserRouter([
  {
    path: '/', element: <MainLayout />, children: [
      { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      { path: 'home', element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      { path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
      { path: 'products', element: <ProtectedRoutes><Products /></ProtectedRoutes> },
      { path: 'categories', element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
      { path: 'brands', element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
      { path: 'wishlist', element: <ProtectedRoutes> <WishList /></ProtectedRoutes> },
      { path: 'product-details/:id', element: <ProtectedRoutes> <ProductDetails /></ProtectedRoutes> },
      { path: 'address/:id', element: <ProtectedRoutes> <Address /></ProtectedRoutes> },
      { path: 'cashorder/:id', element: <ProtectedRoutes> <CashOrder /></ProtectedRoutes> },
      { path: 'allorders', element: <ProtectedRoutes> <AllOrders /></ProtectedRoutes> },
      { path: 'brand/:id', element: <ProtectedRoutes><BrandDetails/> </ProtectedRoutes> },
      { path: 'category/:id', element: <ProtectedRoutes><CategoriesItems/> </ProtectedRoutes> },
      { path: 'updatedata', element: <ProtectedRoutes>  <UpdateUserData/> </ProtectedRoutes> },
      { path: 'updatepass', element: <ProtectedRoutes>  <UpdateUserPassord/> </ProtectedRoutes> },
      {path: '*' , element:<ProtectedRoutes><NotFound/></ProtectedRoutes>}
    ]
  },
  {path : '/' , element:<AuthLayout/>,children:[
    {path:'signup',index:true,element: <Signup/>},
    {path:'signin' ,element: <Signin/>},
    {path:'forgotpassword' ,element: <ForgetPassword/>},
    {path:'verfiycode' ,element: <VerifyCode/>},
    {path:'resetpassword', element:<ResetPassword/>}

  ]}
])

function App() {
  
  return (
    < >
      <CounterContextProvider>
        <WishListContextProvider>
        <RouterProvider router={myRoutes} />
        <ToastContainer theme='colored' autoClose={400}/>
        </WishListContextProvider>
      </CounterContextProvider>
    </>
  );
}

export default App;
