const jwt = require('jsonwebtoken')
const User= require('../model/User')

const authRequired= async(req,res,next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token,'this is my secret key',(err,decodedToken)=>{
            if(err){
                console.log("token not matched..login again");
                res.redirect('/auth/login')
            }
            else{
                console.log(decodedToken)
                next();
            }
        })

    }
    else{
        //console.log("please login first....")
        res.redirect('/auth/login')
    }
}

const checkUser= async(req,res,next)=>{
    const token = req.cookies.jwt
    if(token){

        jwt.verify(token,'this is my secret key',async (err,decodedToken)=>{
            if(err){
                console.log(err);
                res.locals.user=null
                next();
            }
            else{
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user=user
                next();
                
            }
        })

    }else{
        res.locals.user=null
        next();
    }
}

module.exports={authRequired, checkUser}