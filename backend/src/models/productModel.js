const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
  image:String,
  name:String,
  price:{
    amount:{
      type:Number,
      required:true
    },
    currency:{
      type:String,
      default:"INR",
      enum:["INR","USD","EUR"]
    }
  },
  description:String,
  category:String,
  subCategory:String,
  size: {
    type: [String],
  }
})
const productModel=mongoose.model('product',productSchema)
module.exports=productModel