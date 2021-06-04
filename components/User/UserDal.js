/**
 * CAPA DE ACCESO DE DATOS 
 */

const Database = require("../Database/Database");

const UserDal = {
    query: Database.query,
}

module.exports = UserDal;