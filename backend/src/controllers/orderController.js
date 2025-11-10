const { publishToQueue } = require('../broker/broker');
const orderModel = require('../models/orderModel');
const Product = require('../models/productModel');
exports.placeOrder = async (req, res) => {
  try {
    const { shippingInfo, cart, paymentMethod, total } = req.body;
    const userId = req.user._id;
    const productIds = cart.map(item => item.product?._id || item._id || item.product);    
    const products = await Product.find({ _id: { $in: productIds } });
    const items = cart.map(item => {
      let prodId = item.product?._id || item._id || item.product;
      let prod = products.find(p => p._id.toString() === prodId?.toString());
      return {
        product: prod ? prod._id : undefined,
        name: prod ? prod.name : item.name,
        price: prod ? prod.price : item.price,
        quantity: item.quantity || 1
      };
    });
    const validItems = items.filter(i => i.product);
    if (validItems.length === 0) {
      return res.status(400).json({ message: "No valid products found in cart" });
    }
    const order = await orderModel.create({
      user: userId,
      items: validItems,
      shippingInfo,
      paymentMethod,
      total
    });
    await publishToQueue('ORDER-PLACED',{
      id:order._id,
      username:req.user.username,
      email:req.user.email,
      status:order.status,
      paymentMethod:order.paymentMethod,
      total:order.total,
      shippingInfo:order.shippingInfo
    })
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.log("Order placement error:", err);
    res.status(500).json({ message: "Order placement failed" });
  }
};
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await orderModel.find({ user: userId }).populate("items.product");
    console.log("Fetched orders with populated products:", JSON.stringify(orders, null, 2));
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
exports.allOrders=async(req,res)=>{
  try {
    const orders=await orderModel.find();
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
}
exports.orderStatus=async(req,res)=>{
  try {
    const id=req.params.id
    const {status}=req.body
    const order=await orderModel.findById(id)
    order.status=status
    await order.save()
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to update Status" });
  }
}