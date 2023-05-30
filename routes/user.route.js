const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');




require('dotenv').config();



const userRoute = express.Router();


userRoute.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const searchUser = await UserModel.find({ email });
        if (searchUser.length >= 1) {
            res.status(409).send({
                'msg': 'User already registered!'
            })
        } else {
            bcrypt.hash(password, 6, async (err, hash) => {
                const registeredUser = new UserModel({ name, email, password: hash });
                await registeredUser.save();
                res.status(200).send({
                    'msg': 'New user has been registered!'
                })
            })
        }
    } catch {
        res.status(404).send({
            'msg': 'Error in registration!'
        })
    }
})

userRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const getUser = await UserModel.find({ email });
        if (getUser.length >= 1) {
            bcrypt.compare(password, getUser[0].password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ id: getUser[0]._id }, process.env.secret_key, { expiresIn: '7d' });
                    res.status(200).send({
                        'msg': 'Login Successful',
                        'token': token,
                        'data': getUser[0]
                    })
                } else {
                    res.status(401).send({
                        'msg': 'Wrong Credentials!'
                    })
                }
            })
        } else {
            res.status(404).send({
                'msg': 'No such user found!'
            })
        }
    } catch {
        res.status(404).send({
            'msg': 'Error in Login!'
        })
    }
})


module.exports = { userRoute };