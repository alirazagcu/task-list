const { verifyPassword, generateJwt } = require("../../../libs/utils");
const Dal = require("../UserDal");

const login = async (email, password) => {
  let response = {};
  let status = 500;
  let users;

  try {
    users = await Dal.query("SELECT * FROM usuarios WHERE email=?", [email]);
  } catch (error) {
    response = {
      message: "Ha ocurrido un error al iniciar sesión",
      data: null,
    };
    status = 500;
    return {
      status,
      response,
    };
  }

  if (users?.length) {
    const user = users[0];
    if (verifyPassword(password, user.password)) {
      response = {
        message: "USUARIO AUTENTICADO",
        data: {
          id: user.id_usuario,
          email: user.email,
          token: generateJwt({
            id: user.id_usuario,
            email: user.email,
          }),
        },
      };
      status = 200;
    }else{
      response = {

        message: "Usuario o contraseña incorrecta.",
        data: null,
      };
      status = 400;

    }
    console.log(users, "users");
  } else {
    
  }
  return {
    status,
    response,
  };
};

module.exports = login;
