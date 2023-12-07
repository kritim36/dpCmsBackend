const mongoose = require("mongoose")

exports.connectDatabase = async()=>{
    await mongoose.connect("mongodb+srv://dpCms:dpCms@cluster0.f6gdejy.mongodb.net/?retryWrites=true&w=majority")
    console.log("database connected sucessfully")
}