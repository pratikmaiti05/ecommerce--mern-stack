import axios from 'axios'
const instance=axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials:true
})
export const loadProducts=async()=>
    await instance.get('/products/getProducts')
export default instance
