
const UserDto = require("../dtos/user-dto");
const hashService = require("../services/hash-service");
const otpService = require("../services/otp-service");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");




class AuthController{

    

async sendOtp(req,res){
const {phone}=req.body
if(!phone){
    res.status(400).json({message:"phone field is required"})
}

//generate random number
const otp=await otpService.generateOtp();

//hash otp

const ttl=1000*60*2
const expire=Date.now()+ttl

const data=`${phone},${otp}.${expire}`

const hash=hashService.hashOtp(data)

try{
    await otpService.sendBySms(phone,otp)
     res.json({
hash:`${hash}.${expire}`,
phone
    })
}
catch(err){
console.log(err)
}





}

async verifyOtp(req,res){

    const {otp,hash,phone}=req.body
    if(!otp || !hash || !phone){
        res.status(400).json({
            message:"all field are required"
        })
    }

const [hashOtp,expire]=hash.split('.')
if(Date.now()> +expire){
    res.status(400).json({message:"otp expired"})
}

const data=`${phone},${otp}.${expire}`
const isValid=otpService.verifyOtp(hashOtp,data);

if(!isValid){
    res.status(400).json({message:"Invalid Otp"})
}
let user;



try{
   user= userService.findUser({phone:phone})
   if(!user){
    user=await userService.createUser({phone:phone})
   }
   
}
catch(err){
consle.log(err)
res.status(500).json({message:"Db error"})
}

//token

const {accessToken,refreshToken}=tokenService.generateToken({_id:user._id,activated:false})


await tokenService.storeRefreshToken(refreshToken,user._id)

res.cookie('refreshtoken',refreshToken,{
    maxAge:1000*60*60*24*30,
    httpOnly:true
})
//refresh token ko to hum cookie me daal diye lekin hume use refresh token ko database me vi store krna hoga

res.cookie('accesstoken',accessToken,{
    maxAge:1000*60*60*24*30,
    httpOnly:true
})//plan ye tha ki hum humare access token ko local storage ke andar store kre lekin ye ..vbulneable he
//so hum cookie ke anadr styore krenge

const userDto=new UserDto(user)


res.json({
    auth:true,user:userDto
})

}

async refresh(){
    //get refresh token from cookie
    //check if token is valid 
    ////check if token is in database
    //generate new token 
    //put token in the cookie


const {refreshToken:refreshTokenFromCookie}=req.cookies;
let userData;

try{
userData=await  tokenService.verifyRefreshToken(refreshToken)

}
catch(err){
return res.status(401).json({message:"invalid Token"})
}



try{

    const token=await tokenService.findRefreshToken(userData._id,refreshTokenFromCookie)
    if(!token){
        return res.status(401).json({message:'invalid token'})

    }

}catch(err){
return res.status(500).json({message:'internal error'})
}


const user=await userService.findUser({_id:userData._id})
if(!user){
    return res.status(404).json({message:'no user'})
}


const {refreshToken,accessToken}=   tokenService.generateToken({_id:userData._id,})

try{
await tokenService.updateRefreshToken(user._id,refreshToken)

}
catch(err){

}
res.cookie('refreshtoken',refreshToken,{
    maxAge:1000*60*60*24*30,
    httpOnly:true
})


res.cookie('accesstoken',accessToken,{
    maxAge:1000*60*60*24*30,
    httpOnly:true
})

const userDto=new UserDto(user)


res.json({
    auth:true,user:userDto
})

}

async logout(req,res){


    const {refreshToken}=req.cookies;
    await tokenService.removeToken(refreshToken);
    res.clearCookie('refreshtoken')
    res.clearCookie('accesstoken')
    res.json({user:null,auth:false})
    
}



}

module.exports=new AuthController()