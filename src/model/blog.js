const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isActive:{
        type:Boolean,
        default:true
    },
    geoLocation:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],  //longitute come first then lattitude
            required:true
        }
    }
},{timestamps:true})

module.exports = mongoose.model('Blog',BlogSchema)