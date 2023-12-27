const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    stock: {
        type: String,
        required: true
    },

    symbol: {
        type: String,
        required: true
    },

    qty: {
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
