const jwt=require("jsonwebtoken")
const refreshModel = require("../models/refreshModel")


class TokenService{

generateToken(payload){
const accessToken=jwt.sign(payload,"abcde",{
    expiresIn:'1h'
})

const refreshToken=jwt.sign(payload,"abcde",{
    expiresIn:'1y'
})

return{
    accessToken,refreshToken
}

}


async storeRefreshToken(token ,userId){


try{
refreshModel.create({

})
}
catch(err){
    ocnsole.log(err.message)
}

}


async verifyAccessToken(){

return jwt.verify(token,"abcde")

}


async verifyRefreshToken(refreshToken){

return jwt.verify(refreshToken,"abcde")

}


async findRefreshToken(userId,refreshToken){

   return await refreshModel.findOne({userId:userId,token:refreshToken})


}

async updateRefreshToken(userId,refreshToken){
    return await refreshModel.updateOne({userId:userId},{
        token:refreshToken
    })

} 

async removeToken(refreshToken){
 return  await refreshModel.deleteOne({token:refreshToken})


}



}



module.exports=new TokenService()