import express from 'express';
import { Router } from "express";
import User from '../models/user'
const router = Router();

/**
 * @description Signin Users
 * @type POST
 * @api /api/signin
 * @access Public
 */
router.get('/signin', (req, res) => {
    return res.status(200).json({
        message: "refuge wise"
    })

});

/**
 * @description Create Users
 * @type POST
 * @api /api/signup
 * @access Public
 */
router.post('/api/signup', (req, res) => {
    User.findOne({ email: req.body.email }) 
    .exec((error, user) =>{
        if(user) return res.status(400).json({
            message: 'User already registerd'
        })

        const {firstname, lastname, email, password} = req.body;
        const _user = new User({
            firstname,
            lastname,
            email,
            password,
            username: Math.random().toString()
        });
        _user.save((error, data => {
            if(error){
                return res.status(400).json({
                    message: 'Something went Wrong'
                })
            }
            if(data){
                return res.status(201).json({
                    message: 'User Created Successfully..!'

                })}
        }))
    })

});


export default router;