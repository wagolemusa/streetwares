import express from 'express'
const {
    requiresSignin,
    userMiddleware
} = require('../middlewares/index');
import Cart from '../models/cart';
const router = express.Router();


router.post('/user/cart/addtocart', requiresSignin, userMiddleware, (req, res) => {
    Cart.findOne({
            user: req.user._id
        })
        .exec((error, cart) => {
            if (error) return res.status(400).json({
                error
            });
            if (cart) {
                // res.status(200).json({ message: cart })
                const product = req.body.cartItems.product;
                const item = cart.cartItems.find(c => c.product == product)
                let condition, update;


                if (item) {
                    condition = {
                        "user": req.user._id,
                        "cartItems.product": product
                    }
                    update = {
                        "$set": {
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: item.quantity + req.body.cartItems.quantity
                            }
                        }
                    }
                } else {
                    condition = {
                        user: req.user._id
                    };
                    update = {
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    }

                }
                Cart.findOneAndUpdate(condition, update)

                    .exec((error, _cart) => {
                        if (error) return res.status(400).json({
                            error
                        });
                        if (_cart) {
                            return res.status(201).json({
                                cart: _cart
                            })
                        }
                    })
            } else {
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                });
                cart.save((error, cart) => {
                    if (error) return res.status(400).json({
                        error
                    });
                    if (cart) {
                        return res.status(201).json({
                            cart
                        });
                    }
                })

            }

        });
});

export default router;