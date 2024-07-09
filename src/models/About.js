const mongoose=require("mongoose")

const About=mongoose.Schema({
    title:String,
    description:String,
    link:String
})

module.exports=mongoose.model("about",About)