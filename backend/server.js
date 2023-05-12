const express = require('express');
const singleRoute = require('./routes/singleRoute');
const dbConnect = require('./database');
const app = express();
const cors=require("cors")
const cookieParser=require("cookie-parser")

app.use(cors({
    credentials:true  //ye jaruri he because of cookie
}))



dbConnect()


app.use(cookieParser())

app.use('/storage',express.static('storage'))


app.use(express.json({limit:'8mb'}))


app.use(singleRoute)



app.listen(5000,(req,res)=>{
console.log("server is running")
})