import express from 'express';
import { Router } from "express";
const jwt = require('jsonwebtoken')
import User from '../models/user'
const { validateRequest, validateSigninRequest  } = require('../validators/auth')
// import { RegisterValidations, AuthenticationValidations } from '../validators/auth'
import validator from '../middlewares/validater-middleware';
const router = Router();


/**
 * @description Create Users
 * @type POST
 * @api /api/signup
 * @access Public
 */
router.post('/api/signup', validateRequest, validator, async(req, res) => {
    try {
        let { firstname, lastname, email, password } = req.body;
        let user = await User.findOne({ email })
            if (user) return res.status(400).json({
                    message: 'User already registerd'
                })
                const _user =  new User({
                    firstname,
                    lastname,
                    email,
                    password,
                    username: Math.random().toString()
                });
            await _user.save();
            return res.status(201).json({
                seccess: true,
                message: "User Seccessfuly Saved"
            })
       
    } catch (error) {
        console.log("ERR", error.message)
    }
});


/**
 * @description Signin Users
 * @type POST
 * @api /api/signin
 * @access Public
 */
router.get('/signin',validateSigninRequest, validator, async (req, res) => {
    try {
        User.findOne({ email: req.body.email })
            .exec((error, user) => {
                if (user) {
                    if (user.authenticate(req.body.password)) {
                        const token = jwt.sign({ _id: user.id, role: user.role }, process.env.APP_SECRET, { expiresIn: '1h' });
                        const { _id, firstname, lastname, email, role, fullName } = user;
                        res.status(200).json({
                            token,
                            user: {
                                _id, firstname, lastname, email, role, fullName
                            }
                        });
                    } else {
                        return res.status(400).json({
                            message: 'Invaild Password'
                        })
                    }
                } else {
                    return res.status(400).json({
                        message: 'Wrong Email Provided.'
                    })
                }
            })

    } catch (error) {
        console.log("ERR", error.message)
    }
});

export default router;