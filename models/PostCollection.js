const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},

category:{
    type:String,
    enum:['Seed','Fertilizer','Pesticide'],
    required:true
},

price:{
    type:Number,
    required:true
},

image:[],

userId:{
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:'users'
},

createdAt:{
    type:Date,
    default:Date.now
},

likes:[
{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
}
],

comments:[
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        },

        text:{
            type:String,
        },
        createdAt:{
            type:Date,
            default:Date.now
        }

    }
],
// size:{
//     type:String
// }
},{timestamps:true});

postSchema.add({
    size:{
        type:String
    }
})

module.exports = mongoose.model('posts',postSchema)
