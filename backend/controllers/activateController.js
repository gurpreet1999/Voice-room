
const jimp=require("jimp")
const path=require("path")
const userService = require("../services/user-service")
const UserDto = require("../dtos/user-dto")


class ActivateController{


async activate(req,res){



const {name,avatar}=req.body

if(!name || !avatar){
    res.status(400).json({message:"All fields are reuired "})
}

const buffer=Buffer.from(avatar.replace(/^data.image\/(png|jpg|jpeg);base64,/,""),'base64')

const imagePath=`${Date.now()}-${Math.round(Math.random()*1e9)}.png`

try{
const jimpRes=await jimp.read(buffer)
jimpRes.resize(150,jimp.AUTO).write(path.resolve(__dirname,`../storage/${imagePath}`))
}
catch(err){

}


try{
    const user=userService.findUser({_id:req.user._id})
    if(!user){
        res.status(404).json({message:"user not found"})
    
    }
    user.activated=true;
    user.name=name;
    user.avatar=`/storage/${imagePath}`;
    user.save()
    res.json({user:new UserDto(user),auth:true})
}

catch(err){
console.log(err)

}





}




}


module.exports=new ActivateController()