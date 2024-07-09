const mongoose= require('mongoose')

const Sign= mongoose.Schema({
    username:String,
    email:String,
    password : String,
})

module.exports=mongoose.model("sign",Sign)