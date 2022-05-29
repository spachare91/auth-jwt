const express = require('express')
const router= express.Router()

const { login_get,login_post,signup_get,signup_post,logout}= require('../controller/authController')


router.get('/signup',signup_get)

router.get('/login',login_get)

router.post('/signup',signup_post)

router.post('/login',login_post)

router.get('/logout',logout)

module.exports= router

