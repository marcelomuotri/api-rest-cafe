const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {

    const errors = validationResult(req) // incluye a todos los valores, sirve para todas las validaciones
    if (!errors.isEmpty()){             // si errors es distinto de vacio
        return res.status(400).json(errors)
    }

    next(); // si paso , sigue con el siguiente middleware, para eso sirve el next
}

module.exports = {
    validarCampos
}