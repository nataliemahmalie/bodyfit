const newUser =require('../models/trainees')
const newCategory=require('../models/category')
const promise = require('promise');
const axios = require('axios');



module.exports={
    /* Adds a new user */
    async addProfile(req, res, next) {
      try {
         const { email = null,  user = null } = req.body;
         if (!email || !user)
            return res.json("userName and gmailAcount required");

         const docs = await Profile.find({ email: email });
         const docs1 = await Profile.find({ user: user });
         if (docs.length) {
            console.log("A profile with that gmail account already exist");
            return res.json("A profile with that gmail account already exist");
         }
         if (docs1.length) {
            console.log("A profile with that user name already exist");
            return res.json("A profile with that user name already exist");
         }
         else {
            const newUser = new newUser({

               email: email,
               user: user,
            });
            await newUser.save()
            console.log(`saved document: ${newUser}`);
            res.json({ newUser });


         }
      } catch (err) { console.error(err) };
   },
  


 async setUserBlockList (req, res){
  const {full_name=null,upper_body=null,lower_body=null,middle_body=null}= req.body;
   if(upper_body == true){
     console.log("upper_body");
     newUser.updateOne({"user":user}, {"upper_body" : upper_body},
     (err) => {
       if(err)
       console.log(`err: ${err}`);
     });
   }
   if(lower_body == true){
     console.log("lower_body");
     newUser.updateOne({"user": user}, {"lower_body" : lower_body},
     (err) => {
       if(err)
       console.log(`err: ${err}`);
     });
   if(middle_body == true){
console.log("middle_body");
newUser.updateOne({"user":user}, {"middle_body" : middle_body},
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
   
