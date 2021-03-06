//npm init

//npm install express --save
const express = require("express");
//npm install mongoose --save
const mongoose = require("mongoose");
//npm install body-parser --save
const bodyParser = require("body-parser");
//se importa path para los directorios y concatenar
var path = require('path');
const { dirname } = require('path');
//se importa otra seccion de la pagina web
const cors = require("cors")
var peliculas = require('./peliculas');

const app = express();

//puerto de la app
app.listen(3000, () => console.log("Corriendo en el puerto 3000!"));


const whitelist = ["http://localhost:3001"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

//x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', peliculas);

app.use(function (res, res, next){
    next();
});

mongoose
    .connect(
        "mongodb+srv://diegolopez:mrfantastic@cluster0.1eeoh.mongodb.net/PeliculasDB?retryWrites=true&w=majority"
    ).then(() => console.log('Conectado a Atlas'))
    .catch((error) => handleError(error));

    
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'public','inicio.html'));
});

app.use(function(req, res, next) {
    res.status(404).send('Esa pagina no existe');
  });