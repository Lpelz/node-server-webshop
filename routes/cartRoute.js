const express = require('express');
const Cart = require('../models/CartModel');
const router = express.Router();
const {auth, admin} = require('../middleware/token');

router.get('/', admin, async (req, res) => {
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

router.get('/:userId', auth, async (req, res) => {
    try{
        const cart = await Cart.findOne({customer: req.params.userId}).populate('cartProducts.product');
        res.status(200).json(cart);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post('/', async (req, res) => {
    const cart = new Cart(req.body);
    try{
        const savedCart = await cart.save();
        res.status(200).json(savedCart);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

router.patch('/:userId', auth, async (req, res) => {
    try{
        const cart = await Cart.findOne({customer: req.params.userId}); 
        if(req.body.emptyCart){
            cart.cartProducts = [];
        }
        else{
            if(req.body.quantity == 0){
                cart.cartProducts = cart.cartProducts.filter(cartProduct => cartProduct.product != req.body.productId);
            }
            else{
                let cartProduct = cart.cartProducts.find(cartProduct => cartProduct.product == req.body.productId);
                if (cartProduct){
                    cartProduct.quantity = req.body.quantity;
                }
                else{
                    cart.cartProducts[cart.cartProducts.length] = ({product: req.body.productId, quantity: req.body.quantity});
                }
            }
        }
        cart.save();
        res.status(200).json(cart);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

module.exports = router;