const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const User = require('../models/user');

// MAIL CONFIG
const mailer = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

// GET ALL USER
router.get('', async(req,res)=>{
    try{

    }catch(err){

    }
});

// SIGNUP USER
router.post('/signup', async (req, res) => {

    try {
        // Pre User if already exist or not

        const userEmailExist = await User.findOne({
            emailAddress: req.body.emailAddress
        });

        if (!userEmailExist) {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailAddress: req.body.emailAddress,
                password: req.body.password
            })
            await user.save();
            return res.json([{
                success: true,
                message: 'User added successfully'
            }]);
        } else {
            return res.json([{
                success: false,
                message: 'Email Address already exists'
            }]);
        }

    } catch (error) {
        return res.status(500).json([{
            success: false,
            message: error.toString()
        }]);
    }
});


// SIGNIN USER

router.post('/signin', async (req, res) => {
    try {
        const userExists = await User.findOne({
            emailAddress: req.body.emailAddress,
            password: req.body.password
        });

        if (userExists) {
            return res.status(200).send([userExists]);
        } else {
            return res.status(200).json([]);
        }
    } catch (err) {
        return res.status(500).json([{
            success: false,
            message: error.toString()
        }]);
    }
})

module.exports = router;