const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // Changed unique to false since one user can have multiple orders
    },
    order_data: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('order', OrderSchema);