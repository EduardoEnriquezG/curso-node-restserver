const { response } = require("express");

const esAdminRole = (req, resp = response, next ) => {
    if (!req.usuario) {
        return resp.status(500).json({
            msg: 'Se quiere validar el role sin validar el token'
        });
    }

    const {rol, nombre} = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return resp.status(401).json({
            msg: `${ nombre } no tiene el rol de administrador - No puede hacer esto`
        }); 
    }
    next();
}

const tieneRol = ( ... roles) => {
    
    return (req, res = response, next ) => {

        console.log(roles);
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere validar el role sin validar el token'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({msg: 'no contiene un rol valido'})
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}