const express = require('express');
const Product = require('../models/ProductModel');
const router = express.Router();
const {admin} = require('../middleware/token');

router.get('/', async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post('/', admin, async (req, res) => {
    const product = new Product(req.body);
    try{
        const savedProduct = await product.save();
        res.status(200).json(savedProduct);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

router.patch('/:id', admin, async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(product);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

router.delete('/:id', admin, async (req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;