const bodyParser = require("body-parser");

//const mongoose = require("mongoose");
//var path = require('path');
var express = require("express");
var router = express.Router();
//esto nos permite tener una aplicacion mas pequeña

const peliculaSchema = require("./src/models/schemas");
const usuarioSchema = require("./src/models/schemas2");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(function (req, res, next) {
  console.log("Enrutamiento Exitoso");
  next();
});

router.get("/peliculas", (req, res) => {
  peliculaSchema.find((err, peliculas) => {
    if (err) res.status(500).send("Error en la BD1");
    else res.status(200).json(peliculas);
  });
});

router.get("/peliculas/:id", function (req, res) {
  //busca un registro por id
  peliculaSchema.findById(req.params.id, function (err, peliculas) {
    if (err) res.status(500).send("Error en la BD ID");
    else {
      if (peliculas != null) {
        res.status(200).json(peliculas);
      } else res.status(404).send("No se encontro la Pelicula ID");
    }
  });
});

router.get("/usuarios", (req, res) => {
  usuarioSchema.find((err, usuarios) => {
    if (err) res.status(500).send("Error en la DB2");
    else res.status(200).json(usuarios);
  });
});

router.get("/usuarios/:id", function (req, res) {
  //busca un registro por id
  usuarioSchema.findById(req.params.id, function (err, peliculas) {
    if (err) res.status(500).send("Error en la BD ID");
    else {
      if (peliculas != null) {
        res.status(200).json(peliculas);
      } else res.status(404).send("No se encontro el Usuario ID");
    }
  });
});

router.post("/autenticar", (req, res) => {
  const { usuario, password } = req.body;
  usuarioSchema.findOne(
    { usuario: usuario, password: password },
    (err, usuario) => {
      if (err) res.status(500).send("Error en la DB2");
      else {
        if (usuario != null) {
          res.status(200).json(usuario);
        } else res.status(404).send("No se encontro el Usuario ID");
      }
    }
  );
});

module.exports = router;
