const express = require('express');
const app = express();
const userCtl = require('./controllers/userCtl')
const exeCtl = require('./controllers/exeCtl')
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));

/*routes*/
app.set('port',port);
app.use('/', express.static('./public'));//for API
app.use(
 (req,res,next) => {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept");
 next();
 });

 
app.get('/getAllexe',exeCtl.getAllexe);
app.get('/getAllTrainees',userCtl.getAllTrainees);
app.get('/getExeByName/:name',exeCtl.getExeByName)
app.delete('/deleteExe',exeCtl.deleteExe)

/*app.get('getUserByEmail',userCtl.getUserByEmail)
app.get('/getExeByCategory',exeCtl.getExeByCategory)
app.post('/createUser:full_name',userCtl.createUser)
app.put('/setUserBlockList',userCtl.setUserBlockList)
app.post('/addFavorites',userCtl.addFavorites)
app.delete('/deleteFavorites',userCtl.deleteFavorites)
app.get('/getFavorites',userCtl.getFavorites)*/

app.all('*', (req, res, next) => {
    res.send({
        'appName': "body-fit",
        'by':"natali mahmmali & or hadad"})
})

/*app.get('/css/style.css', (req, res) => {
  res.sendFile(`${__dirname}/css/style.css`);
});*/

app.listen(port, () => console.log(`listening on port ${port}`))
