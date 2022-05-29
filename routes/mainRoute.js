const express= require('express')
const router=express.Router()
const {getHome, getSmoothies, setcookies, readcookies} = require('../controller/mainController')
const { authRequired }=require('../middlewares/authMiddleware')
//controller...

//home
router.get('/',authRequired,getHome);

// smoothies
router.get('/smoothies',authRequired, getSmoothies);


// set-cookies..works on response object 
router.get('/set-cookies',setcookies)


// read-cookies..
router.get('/read-cookies',readcookies)









module.exports=router