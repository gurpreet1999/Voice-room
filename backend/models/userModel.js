const mongoose=require("mongoose")


const userSchema=new mongoose.Schema( {
    phone: { type: String, required: true },
    name: { type: String, required: false },
    avatar: { type: String, required: false ,get:(avatar)=>{
        if(avatar){
            return `http://localhost:5000${avatar}`
        }else{
            return avatar  
        }
    }},
    activated: { type: Boolean, required: false, default: false },
},
    {
        timestamps: true,
        toJSON:{getters:true}
    }


)

module.exports = mongoose.model('USER', userSchema);