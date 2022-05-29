const mongoose= require('mongoose')
const {isEmail} = require('validator')
const bcrypt= require('bcrypt')

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [ isEmail,'PLease pass correct email....']
    },
    password:{
        type: String,
        required: true,
        minlength:6

    }

})

// fire an event after data is saved...
// userSchema.post('save',(doc,next)=>{
//     console.log("User has been created...",doc)
//     next();
// });

// fire an event before user is saved to db

userSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt)
    next();
});

// static function for user schema to login
userSchema.statics.login= async function(email,password){
    const user=await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user; 
        }
        throw Error("Wrong password");

    }
    throw Error("Incorrect email...");

};


module.exports=mongoose.model('user',userSchema)