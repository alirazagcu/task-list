const { verifyJwt } = require("../../libs/utils");


const Middleware = (req,res,next) =>{

    try {
        if (req.headers.authorization) {
            console.log(req.headers.authorization)
            if (req.headers.authorization.split(' ')[0] !== 'JWT') throw new Error();
            const jwtData = verifyJwt(req.headers.authorization.split(" ")[1]);
            req.jwtData = jwtData;
            next();
        }
        else throw new Error();
        
    } catch (error) {

        res.status(401).json({
                message: "No se encuentra autenticado",
        });
        
    }

};

module.exports = Middleware;