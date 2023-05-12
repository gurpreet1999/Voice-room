
const USER=require("../models/userModel")

class UserService{


    async findUser(filter){
  const user=await USER.findOne(filter)
return user
    }

    async createUser(data){
        const user=await USER.create(data)
      return user
          }




          

}

module.exports=new UserService