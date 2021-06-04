const Dal = require("../TaskDal");

const mostrar = async (req, res) => {
  let response = {};
  let status = 500;
  let id_usuario;
  if(req.jwtData) {
      id_usuario = req.jwtData.id;
  }
  try {
    const result =  await Dal.query("SELECT id_tareas, titulo, descripcion, emocion, id_usuario FROM tareas WHERE id_usuario=?", [id_usuario]);
    res.status(200).json({
        data: result,
      });;
  } catch (error) {
    res.status(500).json({
        message: error,
      });
  }
};

module.exports = mostrar;
