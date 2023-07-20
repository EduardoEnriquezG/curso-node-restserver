
const { Schema, model} = require('mongoose');

const UsuarioScheme = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    contraseña: {
        type: String,
        required: [true, 'El contraseña es obligatorio']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: String,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

module.exports = model('Usuario', UsuarioScheme);

 