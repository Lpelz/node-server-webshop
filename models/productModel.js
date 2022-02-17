const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique: true
    },
    price: { 
        type: Number, 
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('Product', productSchema);