const mongoose = require("mongoose");

//Se define el esquema de la base de datos
const peliculaSchema = new mongoose.Schema(
  {
    //_id: mongoose.Schema.Types.ObjectId,
    filme: String,
    director: String,
    rate: String,
    categoria: String,
    duracion: String,
    actores: String,
    imagen: String,
    sinopsis: String,
    //cancionId: String,
  },
  {
    collection: "Peliculas",
    versionKey: false, //para forzar a enlazar con una colección
  }
);

module.exports = mongoose.model("Pelicula", peliculaSchema);
