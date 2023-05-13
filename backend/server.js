const express = require('express');
const singleRoute = require('./routes/singleRoute');
const dbConnect = require('./database');
const app = express();
const cors=require("cors")
const cookieParser=require("cookie-parser");
const ACTIONS = require('./action');


const server=require('http').createServer(app)  //it means--server create kro and uske andar express ko pass kro..taki express vi is server pe kaam kre
//pehle mene direct express se hi listen kiya tha 
// /pehle mene express ki api use ki thi  ..server run krne ke liye

const io=require('socket.io')(server,{
    cors:{origin: 'http://localhost:3000',
methods:["GET",'POST']}
})


app.use(cors({
    credentials:true  //ye jaruri he because of cookie
}))



dbConnect()


app.use(cookieParser())

app.use('/storage',express.static('storage'))


app.use(express.json({limit:'8mb'}))


app.use(singleRoute)



//SOCKETS

// jsese hi koi client connect hoga ..usko ek new socket id assign ho jayegi
//frontend me jakar connect ho then dekhna backend me ye message unique socket id generate hogi
//

const socketUserMapping={

}



io.on('connection',(socket)=>{
socket.on(ACTIONS.JOIN,({roomId,user})=>{
  socketUserMapping[socket.id]=user;

//jitne vi client is room me uske sath connect krna he

  const clients=Array.from(io.sockets.adapter.rooms.get(roomId) || [])

  clients.forEach((clientId)=>{
//har ek client ki socket Id hume mil jayegi
//hume sab cliemt ho bhejna he ki me apke sath connect hona chahata hu
//
io.to(clientId).emit(ACTIONS.ADD_PEER,{
    peerId:socket.id,
    createOffer:false,
    user
})

//add peer event jo hum emit kr rahe he usse frontend me handle krna he
//woha par offer create krenge ..jo client join hona chata he ...usko humare client ke list me add krtna hoga
//uski stram ..humari stream ke sath connect krni hogi


//me khud ko bejuga..or uske liye me socket use kruinga
socket.emit(ACTIONS.ADD_PEER,{
   peerId:clientId,
   createOffer:true,
   users:socketUserMapping[clientId]
})

socket.join(roomId)

  })

//handle relayIce
socket.on(ACTIONS.RELAY_ICE,({peerId,icecandidate})=>{
    io.to(peerId).emit(ACTIONS.RELAY_ICE)
})


})














})



//is socket par agar koi event emit ho jati he to hum listen krenge

//

server.listen(5000,(req,res)=>{
console.log("server is running")
})