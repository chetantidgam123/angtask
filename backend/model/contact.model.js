const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    // userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    userId:{type:String},
        fullname:{type:String,required:true},
        address:{type:String,required:true},
        zip:{type:Number ||String,required:true},
        phone:{type:Number || String,required:true},
        email:{type:String,required:true},
        createdBy:{type:String}
    },{
    timestamps:true  
})

const contactModel = mongoose.model('contact',contactSchema);
module.exports = {contactModel}