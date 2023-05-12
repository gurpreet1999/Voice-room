const roomModel = require("../models/roomModel")

class RoomService{

async create(payload){

const {topic , roomType,ownerId}=payload


const room=await roomModel.create({
    topic,
    roomType,
    ownerId,
    speakers:[ownerId]
});

return room

}

async getAllRooms(types){

const rooms=await roomModel.find({roomType:{$in:types}}).populate('speakers').populate('ownerId')


}

}

module.exports=new RoomService()