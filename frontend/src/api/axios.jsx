import axios from 'axios'
const instance=axios.create({
  baseURL: "https://ecommerce-mern-stack-frontend-rkde.onrender.com",
  withCredentials:true
})
export const loadProducts=async()=>
    await instance.get('/products/getProducts')
export default instance
