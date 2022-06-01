const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    //_id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    status: String,
    tipo: String,
    comentarios: [{ fecha: String, comentario: String }],
  },
  { collection: "Usuarios", versionKey: false }
);

module.exports = mongoose.model("Usuario", usuarioSchema);
