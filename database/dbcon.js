require('dotenv').config()
const mongoose= require('mongoose')
exports.databaseConnection= async()=>{
    try {
        const conn= mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Connected to database....")
        
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

