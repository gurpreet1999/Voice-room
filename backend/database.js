const mongoose=require("mongoose")

function dbConnect(){

   
mongoose
.connect("")
.then(() => console.log("DB Connection Successfull"))
.catch((err) => {
  console.error(err);
});



}


module.exports=dbConnect