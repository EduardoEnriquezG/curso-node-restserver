const { validationResult } = require("express-validator");


const validarCampos = (req, res, next) => {
    console.log('Entro a la ultima validacion');

    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next();
}

const validarFormatoId = (req, res, next) => {
    const {id} = req.query;
    const idRegex = /^[0-9a-fA-F]{24}$/;
  
    if (!id) {
        return res.status(400).json({msg: 'No hay información vinculada'});
    }
    if (!idRegex.test(id)) {
      return res.status(400).json({ msg: 'Formato de ID inválido' });
    }
    
  
    next();
  };



module.exports = {
    validarCampos,
    validarFormatoId
}