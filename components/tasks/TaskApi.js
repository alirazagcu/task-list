const express = require("express");
const cors = require("cors");
const Middleware = require("../Middleware/Middleware");
const Services = require("./Services/TaskServices");
const Database = require("../Database/Database");

const Task = express.Router();

Task.use(express.urlencoded({ extended: true }));
Task.use(express.json());
Task.use(cors());

Task.post("/agregar", Middleware, (req, res) => {
  Services.agregar(req, res);
});

Task.post("/eliminar", Middleware,  (req, res) => {
  Services.eliminar(req, res);
});

Task.post("/actualizar", Middleware, (req, res) => {
  Services.actualizar(req, res);
});

Task.get("/mostrar",Middleware, async (req, res) => {
  Services.mostrar(req, res);
});

module.exports = Task;
