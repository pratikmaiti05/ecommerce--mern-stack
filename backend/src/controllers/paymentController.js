// const Razorpay = require('razorpay');
// const Payment = require('../models/paymentModel');
// const productModel=require('../models/productModel');
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });
// exports.createOrder =async (req, res) => {
//   try {
//     const id=req.params.id
//     const productId = await productModel.findById(id);
//     const options={
//       amount: productId.price.amount,
//       currency: productId.price.currency,
//     }
//     const order = await razorpay.orders.create(options);
//     res.status(201).json(order);

//     const newPayment = await Payment.create({
//       orderId: order.id,
//       price:{
//         amount: order.amount,
//         currency: order.currency,
//       },
//       status: 'PENDING',
//     });

//   } catch (error) {
//     res.status(500).send('Error creating order');
//   }
// };
// exports.verifyPayment = async (req, res) => {
//   const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
//   const secret = process.env.RAZORPAY_KEY_SECRET

//   try {
//     const { validatePaymentVerification } = require('../../node_modules/razorpay/dist/utils/razorpay-utils.js')

//     const result = validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
//     if (result) {
//       const payment = await Payment.findOne({ orderId: razorpayOrderId });
//       payment.paymentId = razorpayPaymentId;
//       payment.signature = signature;
//       payment.status = 'COMPLETED';
//       await payment.save();
//       res.json({ status: 'success' });
//     } else {
//       res.status(400).send('Invalid signature');
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Error verifying payment');
//   }
// }
