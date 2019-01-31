const newUser =require('../models/user')
/*const newBlocklist=require('../models/blocklist')*/
const promise = require('promise')


module.exports={
  async getAllTrainees(req, res, next) {
    const result = await newUser.find({})
    if (result) {
        res.json(result);
        console.log(result);
    }
    else {
        res.status(404).send('not found')
    }
},

 async createUser (req,res){
    const {email = null,password = null,full_name = null}=req.body;
    userCtl.createNewUser()= new newUser({email,password,full_name});
    newUser.save()
    .then((result,error) => {
      if(result)
      res.status(200).send(result);
    else if(result == "invalid input")
    res.status(200).json({"error":"invalid input"});
  else
  res.status(200).json({"messege":true})
    });
  },
  
  async: function createNewUser(full_name, password, email){
    return new promise((resolve, reject) => {
      if(full_name == null ||  full_name == "" || full_name == " " || password == null || password == "" || password == " " )
      resolve("invalid input");
  
      newUser.findOne({'full_name': full_name},(err,rec)=>{
        if(err){
          console.log(`error:${err}`);
        }
        else if(rec == null){
          var newUser = new newUser ({
            full_name: full_name,
            password: "0",
            email: email,
            favorites: [],
            block_list:{
              upper_body:0,
              lower_body:0,
              middle_body:0},
            one_time: 0,
            two_times: 0,
            three_times:0,
         
          });
      newUser.save(
            (err) =>
            {
              if(err)
              console.log(`err: ${err}`);
              else{
                resolve(newUser);
              }
            });
          }
          else {
            resolve(rec);
          }
        });
      });
    },
async setUserBlockList (req, res,next){
  const {upper_body=null,lower_body=null,middle_body=null,one_time=null,
   two_times=null,three_times=null}= req.body;
 return new promise((resolve, reject) =>{
   if(upper_body == true){
     console.log("upper_body");
     newUser.update({"full_name": full_name}, {"block_list.upper_body" : upper_body},
     (err) => {
       if(err)
       console.log(`err: ${err}`);
     });
   }
   if(lower_body == true){
     console.log("lower_body");
     newUser.update({"full_name": full_name}, {"block_list.lower_body" : lower_body},
     (err) => {
       if(err)
       console.log(`err: ${err}`);
     });
   }
   if(middle_body == true){
     console.log("middle_body");
     newUser.update({"full_name": full_name}, {"block_list.middle_body" : middle_body},
     (err) => {
       if(err)
       console.log(`err: ${err}`);
     });
   }
   if(one_time == true){
     console.log("one_time");
     newUser.update({"full_name": full_name}, {"one_time": one_time},
     (err) => {
       if(err)
       console.log(`err: ${err}`);
     });
   }
   if(two_times == true){
     console.log("two_times");
     newUser.update({"full_name": full_name}, {"two_times" : two_times},
     (err) => {
       if(err)
       console.log(`err: ${err}`);
     });
   }
   if(three_times == true){
     console.log("three_times");
     newUser.update({"full_name": full_name}, {"three_times" : three_times},
     (err) => {
       if(err)
       console.log(`err: ${err}`);
     });
   }
   newUser.update({"full_name": full_name}, {"password" : "1"},
   (err) => {
     if(err)
     console.log(`err: ${err}`);
   });
   resolve(true);
 });
},
async getUserByEmail(req, res, next) {
  const { email = null } = req.params
  const result = await newUser.findOne({ email })
  
  if (result) res.json(result)
  else res.status(404).send('not found')
},


async addFavorites(req, res) {
  (req.body.full_name, req.body.name)
   .then((result, error) =>{
     if(result == 'exe already exsits in favorites'){
       res.status(200).json({"message": result});
     }
     else{
       res.status(200).json({"message": "exe added to favorites"});
     }
   });
 },
 async deleteFavorites(req, res, next) {
   const { full_name=null,name = null } = req.params
   const result = await newExe.deleteOne(name);
   if (result) {
       res.status(200).send({ "deleted": 1 })
   } else {
       res.status(404).send({ "error":"there was a problem.please try again"})
   }
}},

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

function deleteFavorites(full_name, name){
 return new promise((resolve, reject) => {
   newUser.update({"full_name": full_name}, {$pull: {"favorites": name}},
   (err) => {
     if(err)
     reject(`err:${err}`);
     else{
       resolve(`Updated document: ${newUser}`);
     }
   }
 );
});

},


function getFavorites(full_name){
 return new promise((resolve, reject) => {
   newUser.findOne({"full_name": full_name}, (err, rec) => {
     if(err){
       reject(err);
     }
     else{
       if(rec.favorites == null || rec.favorites.length == 0 ){
         resolve(false);
       }
       newExe.getExePure(rec.favorites)
       .then((result, error) => {
         if(error)
         console.log(`error: ${error}`);
         else{
           resolve(result);
         }
       });
     }
   });
 });
}

