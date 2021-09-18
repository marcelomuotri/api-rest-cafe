const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
const {validarCampos} = require('../middlewares/validar-campos');
const {esRoleValido, emailExiste, idExiste} = require('../helpers/db-validators')


const router = Router();

    //esto esta en usuarios.js
    router.get('/',  usuariosGet)

    router.put('/:id', //lo primero es lo que recibe
        check('id', 'No es un ID valido').isMongoId(), // esto solo revisa el formato del id
        check('id').custom (idExiste), //los llamo de la misma manera que los otros
        validarCampos,
    usuariosPut)
    
    router.post('/', [ //validaciones
        check('nombre', "el nombre no puede estar vacio").not().isEmpty(), // esto es si el nombre no esta vacio, pasa.
        check('password', "El password debe ser de mas de 6 letras").isLength({ min:6 }),     
       /*  check('correo', "el correo ingresado no es valido").isEmail(), */ //aca voy a mandar unarraeglo de middlewares y voy a checkear si el email es un email
        /* check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']), */ //validar con la base de datos
        check('correo').custom(  emailExiste ),

        check('rol').custom(  esRoleValido),
        validarCampos

        
    ],  usuariosPost),

        
       
    router.delete('/:id', [
        check('id', 'No es un ID valido').isMongoId(), // esto solo revisa el formato del id
        check('id').custom (idExiste), //los llamo de la misma manera que los otros
        validarCampos,
    ] ,usuariosDelete)




module.exports = router