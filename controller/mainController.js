const { authRequired }=require('../middlewares/authMiddleware')

exports.getHome= async(req,res)=>{
    res.render('home')
}

exports.getSmoothies=async(req,res)=>{
    res.render('smoothies')

}

exports.setcookies=async(req,res)=>{

        //res.setHeader('Set-Cookie','newUser=false')
        res.cookie('newUser',true,)
        res.cookie('isEmployee',false,{maxAge: 1000 * 60*60 *24, httpOnly:true})
    
        res.send("you got an cookie.....")
    

}

exports.readcookies=async(req,res)=>{
    const cookies= req.cookies;
    console.log(cookies.newUser)
    console.log(cookies.isEmployee)

    res.json(cookies)

}