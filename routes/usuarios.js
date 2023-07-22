
const { Router } = require('express');
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { check, param } = require('express-validator');
const { esRoleValido, emailExist, userByIdExists } = require('../helpers/db-validator.js');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', usuariosGet);

router.post('/',
[
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contraseña', 'El password debe de tener minimo 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExist ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.put('/:id', 
[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( userByIdExists ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( userByIdExists ),
    validarCampos
], usuariosDelete);

module.exports = router;