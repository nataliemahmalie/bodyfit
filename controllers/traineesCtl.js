const newUser =require('../models/trainees')
const newCategory=require('../models/category')
const promise = require('promise');
const axios = require('axios');



module.exports={
    async getAllTrainees(req, res) {
      try {
         const docs = await newUser.find({})
         console.log(docs);
         return res.send(docs);
      } catch (err) { console.error(err) }
   },
   async createUser(req, res, next) {
    try {
      const { user = null, password = null, email= null } = req.body;
      if(user == null || user == "" || user == " " || password == null || password == "" || password == " " )
      return res.json("invalid input");
        
       const docs = await newUser.find({name });
       const docs1 = await newUser.find({email });
       
       if (docs.length) {
          console.log("A profile with that gmail account already exist");
          return res.json("you already exist in the system");
       }
       if (docs1.length) {
          console.log("A profile with that user name already exist");
          return res.json("the user name already exist");
       }
       else {
          const newUser = new newUser({
            user: user,
            password: password,
            email: email});
             
          await newUser.save()
          console.log(`new user added : ${newUser}`);
          res.json({ newUser });
       }
    } catch (err) { console.error(err) };
 },
 async deleteFavorites(req, res, next) {
  const { full_name=null,name = null } = req.params
  const result = newUser.update({"full_name":full_name},{$pull:{"favorites":name}})
  if (result) {
      res.status(200).send({ "deleted": 1 })
  } else {
      res.status(404).send({ "error":"there was a problem.please try again"})
  } 
},
async getAllFavorites(req, res, next) {
  try {
     const { full_name = null } = req.query;
     const result = await Profile.find({ "full_name": full_name });
     console.log(result[0].favorites);
     res.json(result[0].favorites);
  } catch (err) { console.error(err) };
},

 async setUserBlockList (req, res){
  const {full_name=null,upper_body=null,lower_body=null,middle_body=null}= req.body;
   if(upper_body == true){
     console.log("upper_body");
     newUser.updateOne({"full_name":full_name}, {"upper_body" : upper_body},
     (err) => {
       if(err)
       console.log(`err: ${err}`);
     });
   }
   if(lower_body == true){
     console.log("lower_body");
     newUser.updateOne({"full_name": full_name}, {"lower_body" : lower_body},
     (err) => {
       if(err)
       console.log(`err: ${err}`);
     });
   if(middle_body == true){
console.log("middle_body");
newUser.updateOne({"full_name":full_name}, {"middle_body" : middle_body},
(err) => {
  if(err)
  console.log(`err: ${err}`);
});
   }}
  }}
/*

  



function addFavorites(full_name, name){
  return new promise((resolve, reject) => {
    var temp = false;
    newUser.findOne({"full_name": full_name}, (err, rec) => {
      if(err){
        reject(err);
      }
      else{
        for(let i in rec.favorites){
          if(name == rec.favorites[i])
              temp = true;
        }
      }

      if(temp == false){
        newUser.update({"full_name": full_name}, {$push: {"favorites": name}},
        (err) => {
          if(err)
          reject(`err:${err}`);
          else{
            resolve(`Updated document: ${newUser}`);
          }
        }
      );
      }

      else{
        resolve('exe already exsits in favorites');
      }


 });

 });
 },




 
*/
   
