const { publishToQueue } = require('../broker/broker');
const orderModel = require('../models/orderModel');
const Product = require('../models/productModel');
exports.placeOrder = async (req, res) => {
  try {
    const user = req.user;

    if (!user.cart.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await orderModel.create({
      user: user._id,
      items: user.cart.map(item => ({
        product: item.product,
        size: item.size,
        quantity: item.quantity
      })),
      total: req.body.total,
      shippingInfo: req.body.shippingInfo,
      status: "Pending"
    });

    user.cart = [];
    await user.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order failed" });
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