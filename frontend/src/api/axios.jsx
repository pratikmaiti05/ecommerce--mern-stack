import axios from 'axios'
const instance=axios.create({
  // baseURL: "http://localhost:3000/",
  baseURL: "https://ecommerce-mern-stack-backend-5fmb.onrender.com/",
  withCredentials:true
})
export const loadProducts=async()=>
    await instance.get('/products/getProducts')
export default instance
