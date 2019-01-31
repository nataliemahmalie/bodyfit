const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const newBlocklist = new Schema({
    upper_body: Boolean,
    lower_body: Boolean,
    middle_body: Boolean
});


module.exports =newBlocklist;

