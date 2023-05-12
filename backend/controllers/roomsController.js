const RoomDto = require("../dtos/room-dto");
const roomService = require("../services/room-service");

class RoomsController{

async create(req,res){

const {topic , roomType}=req.body;
if(!topic || !roomType){
    return res.status(400).json({message:'all filed are required'})
}


const room=await roomService.create({
    topic,
    roomType,
    ownerId:req.user._id
})

return res.json(new RoomDto(room));



}

async index(req,res){
const rooms=await roomService.getAllRooms(['open'])
const allrooms=rooms.map((room)=>new RoomDto(room))
return res.json(allrooms)


}



}

module.exports=new RoomsController();