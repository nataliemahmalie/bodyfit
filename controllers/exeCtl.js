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
  },

/*
    async :function getExePure(fav_array){
        return new promise((resolve, reject) => {
          newExe.find({"name": {$in: fav_array}}, (err, rec) => {
            if(err)
            reject(err);
            else{
              resolve(rec);
            }
          });
        });
      },
   async: function getExeByCategory(category){
        return new promise((resolve, reject) => {
          category.findOne({"name": '5b164679e7179a6034c7403b'}, (err, rec) => {
            if(err)
            reject(err);
            else{
              getExePure(rec[category].newExe)
              .then((result,error)=>{
                if(error)
                rejcect(error);
                else
                resolve(result);
              });
            }
          });
        });
      }
}
}*/
}
