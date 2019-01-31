const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*const newBlocklist=require ('./blocklist')
const newCategory=require (./category)*/


const userSchema = new Schema({
full_name: {type:String,required: true},
password:  {type: String, required: true},
email:     {type: String, required: true},
/*favorites:[String],
block_list:[newBlocklist],
category:[newCategory],*/
bmi:{type: String, required: true},
height:{type: String, required: true},
weight:{type: String, required: true},
one_time:{type: String},
two_times:{type: String},
three_times:{type: String},

});

const newUser=mongoose.model('user',userSchema);
module.exports=newUser;