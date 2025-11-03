const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const Order = require("../models/Order");
const Product = require("../models/Product");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/orders/create-order
// body: { items: [{ productId, quantity }], amount }
router.post("/create-order", async (req, res) => {
  try {
    const { items, amount } = req.body;

    // Create order on server (Razorpay expects amount in paise)
    const options = {
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    };

    const rOrder = await razorpay.orders.create(options);

    // Save order skeleton in DB
    const order = new Order({
      items: await Promise.all(
        items.map(async it => {
          const p = await Product.findById(it.productId).lean();
          return {
            product: p ? p._id : null,
            name: p ? p.name : "Unknown",
            price: p ? p.price : it.price,
            quantity: it.quantity
          };
        })
      ),
      amount,
      razorpay: { order_id: rOrder.id }
    });

    await order.save();

    res.json({
      success: true,
      orderId: rOrder.id,
      razorpayOrder: rOrder
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders/verify
// After payment success, client sends back payment_id, order_id, signature
router.post("/verify", async (req, res) => {
  const crypto = require("crypto");
  try {
    const { order_id, payment_id, signature } = req.body;
    const body = order_id + "|" + payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === signature) {
      // Update order in DB
      const order = await Order.findOneAndUpdate(
        { "razorpay.order_id": order_id },
        { $set: { "razorpay.payment_id": payment_id, "razorpay.signature": signature } },
        { new: true }
      );
      return res.json({ success: true, order });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
