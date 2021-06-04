/**
 * OBJETO PARA CONSULTAR/EJECUTAR SENTENCIAS A LA BASE DE DATOS
 */


const mysql = require("mysql2/promise");
const databaseConfig = require("./databaseConfig");

async function query (sql, params){

    const connection = await mysql.createConnection(databaseConfig.connection);
    const [result] = await connection.execute(sql,params);
    return result;
}

const Database = {
    query,
}

module.exports = Database;