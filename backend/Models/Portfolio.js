const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
