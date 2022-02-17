const express = require('express');
const Order = require('../models/OrderModel');
const router = express.Router();
const {auth, admin} = require('../middleware/token');

router.get('/', admin, async (req, res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', admin, async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post('/', auth, async (req, res) => {
    const order = new Order(req.body);
    try{
        const savedOrder = await order.save();
        res.status(200).json(savedOrder);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

router.patch('/:id', admin, async (req, res) => {
    try{
        const order = await Order.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(order);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

router.delete('/:id', admin, async (req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;