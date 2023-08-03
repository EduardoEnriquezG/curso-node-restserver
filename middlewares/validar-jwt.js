const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    
        jwt.verify(token, process.env.SECRETORPRIVATEKEY, async (err, payload) => {
            if (err) {
                return res.status(401).json(err);
            }
            const { uid } = payload; 
            const usuario = await Usuario.findById( uid );

            if (!usuario) {
                return res.status(401).json({msg: 'Token no válido - usuario no existe'});
            }

            //Verificar su el uid tiene estado en true
            if (usuario.estado === 'false'){
                return res.status(401).json({msg: 'Token no válido - usuario inactivo'});
            }
            req.usuario = usuario;
            console.log(usuario);
            
            next();
        });

}

module.exports = {
    validarJWT
}