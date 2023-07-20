const { response } = require('express');
const Usuario = require('../models/usuario');


const usuariosGet = (req, res = response) => {

    const {q, nombre = 'No name', apikey, page,limit,edad} = req.query;

    res.json(
        {
          ok: true,
          msg: 'get API - Controlador',
          q,
          nombre,
          apikey,
          page,
          limit,
          edad
        }
    );
}

const usuariosPost = async (req, res = response) => {

    const body = req.body;
    const usuario = new Usuario(body);

    await usuario.save();

    res.json(
        {
          ok: true,
          msg: 'post API - Controlador',
          usuario
        }
    );
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json(
        {
          ok: true,
          msg: 'put API - Controlador',
          "id": id 
        }
    );
}

const usuariosPatch = (req, res = response) => {
    res.json(
        {
          ok: true,
          msg: 'patch API - Controlador'
        }
    );
}

const usuariosDelete = (req, res = response) => {
    res.json(
        {
          ok: true,
          msg: 'delete API - Controlador'
        }
    );
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} 