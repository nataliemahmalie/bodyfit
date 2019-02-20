const mongoose = require('mongoose');
const newCategory=require ('./category');


const schema={
user: {type: String, required: true},
password:  Number,
email:{type: String, required: true},
favorites:[String],
category:[newCategory],
bmi: Number,
height:Number,
weight: Number,
one_time:{type:Boolean},
two_times:{type:Boolean},
three_times:{type:Boolean}
}

const user_schema = mongoose.Schema(schema);//Nat-> Schema
const newUser=mongoose.model('trainees',user_schema);
module.exports=newUser;