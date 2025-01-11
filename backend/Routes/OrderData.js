const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        const data = req.body.order_data;

        // Ensure data is valid
        if (!data || !req.body.email) {
            return res.status(400).json({ success: false, error: "Invalid request data" });
        }

        let eId = await Order.findOne({ email: req.body.email });

        if (!eId) {
            // Create a new order if email not found
            await Order.create({
                email: req.body.email,
                order_data: [data],
            });
            return res.status(200).json({ success: true, message: "Order created successfully." });
        } else {
            // Update existing order for the email
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            return res.status(200).json({ success: true, message: "Order updated successfully." });
        }
    } catch (err) {
        console.error("Server Error:", err.message);
        return res.status(500).json({ success: false, error: err.message });
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        // Validate email presence
        if (!req.body.email) {
            return res.status(400).json({ success: false, error: "Email is required" });
        }

        // Find the order data for the given email
        let myData = await Order.findOne({ 'email': req.body.email });
        
        // If no data is found for the email
        if (!myData || !myData.order_data || myData.order_data.length === 0) {
            return res.status(404).json({ success: false, error: "No orders found" });
        }

        // Return the order data
        return res.status(200).json({ success: true, orderData: myData });
    } catch (error) {
        console.error("Server Error:", error.message);
        return res.status(500).json({ success: false, error: "Server error occurred, please try again." });
    }
});


module.exports = router;