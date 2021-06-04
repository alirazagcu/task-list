/**
 * Este script es el encargado de levantar el servidor e importar los componentes.
 */

require("dotenv").config(); //OBTIENE LA CONFIGURACION DE LA BASE DE DATOS
const express = require("express");
const cors = require("cors");
const path = require('path')
const Database = require("./components/Database/Database"); //NECESARIO PARA HACER LA CONECION A LA BASE DE DATOS 

// Componenetes

const User = require("./components/User/User");
const Task = require("./components/tasks/Task");

//Express Config

const app = express();
app.use(express.urlencoded({ extended: true })); //PERMITE LEER URL POR PARAMETROS
app.use(express.json()); //PERMITE RECIBIR LOS ARCHIVOS EN JSON
app.use(cors()); //API PUBLICA
app.use(express.static(path.join(__dirname, 'client', 'build')))

// Registrar componentes

app.use("/usuarios", User.api);

app.use("/tareas", Task.api);

/*PERMITE CONECTARSE AL SERVIDOR EN EL PUERTO 3000*/

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err) {
     if (err) {
       res.status(500).send(err)
     }
  })
})

app.listen(3000, () => {
  console.log("SERVIDOR CORRIENDO EN EL PUERTO 3000");
  // Database.query("SELECT * FROM lista_tareas");
});
