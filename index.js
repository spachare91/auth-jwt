require('dotenv').config()
const express= require("express")
const app =express()
require('./database/dbcon').databaseConnection()
const cookieParser= require('cookie-parser')
const {checkUser} = require('./middlewares/authMiddleware')

const port= process.env.PORT


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use(express.static('public'))
app.set("view engine","ejs")

app.get('*',checkUser)
app.use('/',require('./routes/mainRoute'))
app.use('/auth',require('./routes/authRouter'))

app.listen(port,()=>{
    console.log(`Connected on http://localhost:${port}`);
})