const newExe = require('../models/exe')
const newCategory = require('../models/category')
const newUser = require('../models/user')
const promise = require('promise')


module.exports = {
    async getAllexe(req, res, next) {
        const result = await newExe.find({})
        if (result) {
            res.json(result);
            console.log(result);
        }
        else {
            res.status(404).send('not found')
        }
    },
 
    async deleteExe(req, res, next) {
        const {name = null } = req.params
        const result = await newExe.deleteOne(name);
        if (result) {
            res.status(200).send({ "deleted": 1 })
        } else {
            res.status(404).send({ "error":"there was a problem.please try again" })
        }
    },

    async getExeByName(req, res, next) {
        const { name = null } = req.params
    
        const result = await newExe.findOne(name);
        if (result) {
            res.status(200).send(result)
            console.log(result);
        } else {
            res.status(404).send({ "error":"there was a problem.please try again" })
        }
    },
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

