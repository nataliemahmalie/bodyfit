const mongoose = require('mongoose')
const Schema = mongoose.Schema;
/*const newCategory=require ('./category')*/


const exeSchema = new Schema({
    /*category: [category],*/
    name: {type: String},
    image: { type: String},
    level: [String],
    sets: [String],       
    video_steps:[String],
    upper_body:Boolean,
    lower_body:Boolean,
    middle_body:Boolean

});

const newExe=mongoose.model('exe',exeSchema);
module.exports=newExe;