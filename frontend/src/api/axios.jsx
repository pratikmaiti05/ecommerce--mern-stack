import axios from 'axios'
const instance=axios.create({
  baseURL: "https://ecommerce-mern-stack-backend-5fmb.onrender.com",
  withCredentials:true
})
export default instance
