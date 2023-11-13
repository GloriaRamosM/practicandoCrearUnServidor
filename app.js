const express = require("express");
const path = require("path");
const fs = require("fs");

const port = 3000;

const app = express();

// yo este app lo puedo llamar cuantas veces quiera para traerme un ruta o mostrar un mensajito
app.get("/", (req, res) => {
  res.send("Hola Mundo!");
});

/* aca yo estoy usando los dos modulos de express, el fs y el path , los dos son necesarios para traerme un archivo y cada uno tiene sus metodos dentro de si mismo
por ejemplo  path.join ( me traigo un archivo que esta en x posicion de mis documentos)

por ejemplo fs.readFile ( le indico que archivo me va a leer y en que idioma esta y ademas le pongo el error y la data)

analizar aca ojo gloria y hacerlo igual con otro archivo json que puedo crear yo sola 


*/
app.get("/personajes/:id", (req, res) => {
  const dibujo = path.join(__dirname, "/src/data/personajes.json");

  fs.readFile(dibujo, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).send("error al leer el archivo");
    }

    const personajes = JSON.parse(data);
    const personaje = personajes.find((p) => p.id === parseInt(req.params.id));

    if (!personaje) {
      return res.status(404).send("El personaje que busca no se encuentra");
    }

    return res.json(personaje);
  });
});

app.listen(port, () => {
  console.log("Servidor corriendo en puerto http://localhost:3000");
});
