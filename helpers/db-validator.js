const Role = require('../models/role');
const Usuario = require('../models/usuario');
const mongoose = require('mongoose');


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol: ${ rol } no está registrado en BD`);
    }
}


const emailExist = async (correo = '') => {

    const existeEmail = await Usuario.findOne({correo});
    if ( existeEmail ){
        throw new Error(`El correo: ${ correo } ya está en uso`);
    } 

}

const userByIdExists = async ( id ) => {

    if (mongoose.Types.ObjectId.isValid( id )) {
        const userExists = await Usuario.findById( id );
        console.log(`Es valido: ${id}`);
        if (!userExists) {
            console.log(`No existe: ${id}`);
            throw new Error(`El id ${id} no existe en la BD`);
        }
    } else {
        console.log(`No valido: ${id}`);
        throw new Error(`El id ${id} no es válido`);
    }
}


module.exports = {
    esRoleValido,
    emailExist,
    userByIdExists
}