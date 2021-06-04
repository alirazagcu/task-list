/**
 * Este archivo centraliza funciones a las que todos los componentes deben/pueden acceder.
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const utils = {
  /**
   * ESTA FUNCION DE ENCARGA DE ENCRIPTAR UN STRING
   * @param (String) password
   * @returns (String) contraseña encriptada
   */
  hashPassword: (password) =>
    bcrypt.hashSync(password, parseInt(process.env.COST_FACTOR)),

  verifyPassword: (password, encryptedPassword) =>
    bcrypt.compareSync(password, encryptedPassword),

  generateJwt: (data) =>
    jwt.sign(data, process.env.JWT_PASSWORD, { expiresIn: "7d" }),

  verifyJwt: (token) => jwt.verify(token, process.env.JWT_PASSWORD),
};

module.exports = utils;
