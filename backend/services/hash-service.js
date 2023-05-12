const crypto=require("crypto")
//we will use crypto module to create secret key


class HashService{
    hashOtp(data){

return crypto.createHmac('sha246',"abcde").update(data).digest("hex")

    }
}

module.exports= new HashService