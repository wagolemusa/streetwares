import express from 'express';
import { Router } from "express";
const jwt = require('jsonwebtoken')
import User from '../../models/user'
const router = Router();


/**
 * @description Create Users
 * @type POST
 * @api /api/admin/signup
 * @access Public
 */
router.post('/admin/signup', async(req, res) => {
    await User.findOne({ email: req.body.email }) 
    .exec((error, user) =>{
        if(user) return res.status(400).json({
            message: 'User already registerd'
        })

        const {firstname, lastname, email, password} = req.body;
        let _user = new User({
            firstname,
            lastname,
            email,
            password,
            username: Math.random().toString(),
            role: 'admin'
        });
         _user.save((error, data => {
            if(error){
                return res.status(400).json({
                    message: 'Something went Wrong'
                })
            }
            if(data){
                return res.status(201).json({
                    message: 'Admin Created Successfully..!'

                })}
        }))
    })

});


/**
 * @description Signin Users
 * @type POST
 * @api /api/admin/signin/
 * @access Public
 */
 router.post('/admin/signin', (req, res) => {
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