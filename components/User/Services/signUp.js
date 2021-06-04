const { hashPassword, generateJwt } = require("../../../libs/utils");
const Dal = require("../UserDal");

/**
 * SIGNUP CREA UN NUEVO USUARIO
 *
 *
 */
const signUp = async (nombre_completo, email, password, edad) => {
  let response = {};
  let status = 500;

  //BUSCA USUARIOS DUPLICADOS
  let duplicateUsers = null;
  try {
    duplicateUsers = await Dal.query(
      "SELECT email FROM usuarios WHERE email = ?",
      [email]
    );
  } catch (error) {
    response = {
      message: "Ha ocurrido un error al registrar al usuario",
      data: null,
    };
    status = 500;
    return {
      status,
      response,
    };
  }

  //INSERTAR USUARIOS SI NO EXISTE
  if (duplicateUsers?.length === 0) {
    try {
      const result = await Dal.query(
        "INSERT INTO usuarios (nombre_completo, email, password, edad) VALUES (?, ?, ?, ?)",
        [nombre_completo, email, hashPassword(password), edad]
      );
      console.log("Result: ", result);
      response = {
        message: "REGISTRO DE USUARIO REALIZADO CORRECTAMENTE",
        data: {
          id: result.insertId,
          nombre: nombre_completo,
          email: email,
          edad: edad,
          token: generateJwt({
            id: result.insertId,
            nombre: nombre_completo,
            email: email,
            edad: edad,
          }),
        },
      };
      status = 200;
    } catch (error) {
      response = {
        message: error.message,
        data: null,
      };

      status = 500;
    }
  } else {
    response = {
      message: `El email ${email} ya está en uso.`,
      data: null,
    };
    status = 400;
  }

  return {
    status,
    response,
  };
};

module.exports = signUp;
