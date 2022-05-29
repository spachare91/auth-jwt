const jwt = require("jsonwebtoken")
const User = require("../model/User")

const maxAge= 24 * 60 *60;

const createToken = (id)=>{
    return jwt.sign({id},'this is my secret key',{
        expiresIn: maxAge
    })
};

exports.login_get= async(req,res)=>{
    res.render('login')

}

exports.signup_get= async(req,res)=>{
    res.render('signup')
}

exports.login_post=async(req,res)=>{
    const { email,password}=req.body
    try {
        const user= await User.login(email,password)
        const jwttoken= createToken(user._id)
        res.cookie('jwt',jwttoken,{
            maxAge:maxAge*1000
        })

        res.json({user:user._id})
    } catch (err) {
        res.status(400).json({err})
    }


}

exports.signup_post= async function(req,res){
    const {email,password}= req.body
    try {
        const user = await User.create({email, password})
        // create jwt token
        const jwttoken= createToken(user._id)
        res.cookie('jwt',jwttoken,{
            maxAge:maxAge*1000
        })

        res.status(201).json({user:user._id})

    } catch (err) {
        res.status(400).json({err})
    }
    //res.send("some data after signup")
}

exports.logout= async(req,res)=>{
    res.cookie('jwt','',{ maxAge:1})
    res.redirect('/')
}