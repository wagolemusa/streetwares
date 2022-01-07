import express from 'express';
import { Router } from "express";
import { validationResult } from 'express-validator';
const { validateRequest, validateSigninRequest  } = require('../../validators/auth')
import validator from '../../middlewares/validater-middleware';
const jwt = require('jsonwebtoken')
import User from '../../models/user'
const router = Router();


/**
 * @description Create Users
 * @type POST
 * @api /api/admin/signup
 * @access Public
 */
router.post('/admin/signup', validateRequest, validator, async(req, res) => {
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
                    username: Math.random().toString(),
                    role: 'admin'
                });
            await _user.save();
            return res.status(201).json({
                seccess: true,
                message: "Admin Seccessfuly Saved"
            })
       
    } catch (error) {
        console.log("ERR", error.message)
    }
});


/**
 * @description Signin Users
 * @type POST
 * @api /api/admin/signin/
 * @access Public
 */
 router.post('/admin/signin', validateSigninRequest, validator, async(req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(user) {
            if(user.authenticate(req.body.password) && user.role === 'admin'){
                const token = jwt.sign({_id: user.id}, process.env.APP_SECRET,{ expiresIn: '1h' });
                const {_id, firstname, lastname, email, role, fullName } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, firstname, lastname, email, role, fullName
                    }
                });
            }else{
                return res.status(400).json({
                    message: 'Invaild Password'
                })
            }
        } else{
            return res.status(400).json({
                message: 'Wrong Email Provided.'
            })
        }
    })
});


export default router;