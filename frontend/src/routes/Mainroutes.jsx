import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
const Home= lazy(()=>import('../pages/Home')) 
const Product= lazy(()=>import('../pages/Product'))
const Cart= lazy(()=>import('../pages/Cart')) 
const Login= lazy(()=>import('../pages/Login')) 
const Collection= lazy(()=>import('../pages/Collection')) 
const Orders= lazy(()=>import('../pages/Orders')) 
const Placeorder= lazy(()=>import('../pages/Placeorder')) 
const About= lazy(()=>import('../pages/About')) 
const Contact= lazy(()=>import('../pages/Contact')) 
const Register= lazy(()=>import('../pages/Register')) 
const Logout= lazy(()=>import('../pages/Logout')) 
const  Addproduct=  lazy(()=>import('../pages/Addproduct')) 
const Checkout= lazy(()=>import('../pages/Checkout')) 
const OrderSuccess= lazy(()=>import('../pages/OrderSuccess')) 
const Mainroutes = () => {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout/>} />
          <Route path='/register' element={<Register/>}/>
          <Route path="/collection" element={<Collection />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/place-order" element={<Placeorder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/add-product" element={<Addproduct/>} />
          <Route path="/orders-checkout" element={<Checkout/>} />
          <Route path="/order-success/:id" element={<OrderSuccess/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
  )
}
export default Mainroutes