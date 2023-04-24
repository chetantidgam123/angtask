const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String || Number,required:true},
    phone:{type:String || Number,required:true,minlength:10,maxlength:10},
    role:{type:String,required:true},
},{
    timestamps:true  
})

const UserModel = mongoose.model('users',UserSchema);
module.exports = {UserModel}