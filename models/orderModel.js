const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderProducts: [{
        quantity: {
            type: Number,
            default: 1
        },
        product : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);