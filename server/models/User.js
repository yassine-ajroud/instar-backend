const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    Firstname : {
        type : String
    },
    Lastname : {
        type : String
    },
    email : {
        type:String
    },
    phone : {
        type:String
    },
    password:{
        type:String
    }
},{timestamps:true})
const user = mongoose.model('User',userSchema)
module.exports= user