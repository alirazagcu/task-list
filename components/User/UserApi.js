/**
 * INSTANCIA DE EXPRESS PARA LOS SERVICIOS DE USUARIO
 */

const express = require("express");
const cors = require("cors");
const Services = require("./Services/UserServices");
const Middleware = require("../Middleware/Middleware");

const User = express.Router();

User.use(express.urlencoded({ extended: true }));
User.use(express.json());
User.use(cors());

User.post("/sign-up", async (req, res) => {
  let { nombre_completo, email, password, edad } = req.body;
  if (!nombre_completo || !email || !password || !edad) res.status(400).json({message: "Información requerida"});
  const { status, response } = await Services.signUp(
    nombre_completo,
    email,
    password,
    edad
  );
  res.status(status).json(response);
});

User.post("/login", async (req, res) => {

	let { email, password } = req.body;
  if (!email || !password) res.status(400).json({message: "Información requerida"});

  const { status, response } = await Services.login(email, password);
  res.status(status).json(response);
});

User.post("/secreta", (req, res) => {

  res.status(200).json({
    hola: "mundo"
  });
});




module.exports = User;
