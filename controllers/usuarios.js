const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');


const usuariosGet = async (req, res = response) => {

    const { limit = 5, offset = 0, id} = req.query;
    const query = {"estado": "true"};

    if (id) {
        const user = await Usuario.findById(id);
        return res.json({user});
        
    } else {
        const [ total, usuarios ]  = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query).limit()
            .skip(Number(offset))
            .limit(Number(limit))
        ]); 
    
        return res.json(
            {
                total,
                usuarios
            }
        );    
    }
    
}

const usuariosPost = async (req, res = response) => {

    

    const {nombre, correo, contraseña, rol} = req.body;
    const usuario = new Usuario({nombre, correo, contraseña, rol});

    //Encriptar (Hash) de contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.contraseña = bcryptjs.hashSync(contraseña, salt);

    await usuario.save();

    res.json(
          usuario
    );
}

const usuariosPut = async (req, res = response) => {

    const {id} = req.params.id;
    const { _id,contraseña, google, correo, ...resto } = req.body;

    //Validar ID contra BD
    if ( contraseña ) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.contraseña = bcryptjs.hashSync(contraseña, salt);
    }

    const usuario = await Usuario.findOneAndUpdate({id} , resto, {new: true} );
    
    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json(
        {
          ok: true,
          msg: 'patch API - Controlador'
        }
    );
}

const usuariosDelete = async (req, res = response) => {
    
    const { id } = req.params;
    //const uid = req.uid;
    //Fisicamente borrado
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate(id , {"estado": "false"}, {new: true} );

    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} 