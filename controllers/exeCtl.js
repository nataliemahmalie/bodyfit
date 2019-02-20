const newExe = require('../models/exercises')
const newCategory = require('../models/category')
const newUser = require('../models/trainees')
const promise = require('promise')
const axios = require('axios');


module.exports = {
    async getAllExe(req, res) {
        try {
           const docs = await newExe.find({})
           console.log(docs);
           return res.json(docs);
        } catch (err) { console.error(err) }
     },
     async findExeByName(req, res, next) {
        const { name = null } = req.params
    
        const result = await newExe.find({name});
        if (result) {
            res.status(200).send(result)
            console.log(result);
        } else {
            res.status(404).send({ "error":"there was a problem.please try again" })
        }
    },
    async deleteExe(req, res, next) {
        const {name = null } = req.params
        const result = await newExe.deleteOne({name});
        if (result) {
            res.status(200).send({ "deleted": 1 })
        } else {
            res.status(404).send({ "error":"there was a problem.please try again" })
        }
    },
    async editExeByName(req, res, next) {
      const { name = null } = req.params;
      const {sets=null} = req.body;

      const result = await newExe.updateOne({name}, { sets })
      if(result){
          res.status(200).send({"edited":name})
      }
      else{
          res.status(404).send({"error":"there was a problem.please try again" })
      }
  }
}