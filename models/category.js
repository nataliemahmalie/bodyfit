const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const newCategory = new Schema({
male:Boolean,
female:Boolean

});

module.exports=newCategory;


