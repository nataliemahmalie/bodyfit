const mongoose = require('mongoose');
/*const newCategory=require (./category)*/


const schema={
    /*category: [category],*/
    name: {type: String},
    image: { type: String},
    level: { type: String},
    sets: Number  
    /*video_steps:[String]*/
}

const user_schema = mongoose.Schema(schema);//Nat-> Schema
const newExe=mongoose.model('exercises',user_schema);
module.exports=newExe;