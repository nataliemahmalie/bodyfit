const express = require('express');
const app = express();
const calcBmi = require('bmi-calc')
const traineesCtl = require('./controllers/traineesCtl')
const exeCtl = require('./controllers/exeCtl')
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));

/*routes*/
app.set('port',port);
app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.set("Content-Type", "application/json");
        next();
 });

app.get('/getAllTrainees',traineesCtl.getAllTrainees)
app.get('/getAllExe',exeCtl.getAllExe);
app.get('/findExeByName/:name',exeCtl.findExeByName)
app.delete('/deleteExe/:name',exeCtl.deleteExe)
app.post('/createUser/:user&email&password',traineesCtl.createUser) //work when gmail API is connected. 
app.put('/editExeByName',exeCtl.editExeByName)
app.put('/setUserBlockList',traineesCtl.setUserBlockList)
app.get('/getAllFavorites',userCtl.getAllFavorites)
app.delete('/deleteFavorites',userCtl.deleteFavorites)
/*app.post('/addFavorites',userCtl.addFavorites)*/

app.all('*', (req, res, next) => {
    res.send({
        'appName': "body-fit",
        'by':"natali mahmmali & or hadad",
        'git repository':"https://github.com/nataliemahmalie/bodyfit"})
})

/*app.get('/css/style.css', (req, res) => {
  res.sendFile(`${__dirname}/css/style.css`);
});*/

app.listen(port, () => console.log(`listening on port ${port}`))
