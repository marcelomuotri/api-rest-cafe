const { response } = require('express');

const bcryptjs = require('bcryptjs') //este es para las contraseñas

const Usuario = require ('../models/usuario'); // aca traigo el modelo de la coleccion



// aca pongo las rutas que van a ir a user.js
const usuariosGet = async(req = request, res = response) => {

    const query = {estado : true} // solo va a mostrar las que tengan estado: true

    const { limite = 5 , desde = 0} = req.query //esto es lo que recibo, si no viene nada, muesto 5
   /*  const usuarios = await Usuario.find( query ) // solo va a mostrar las que tengan estado: true
        .skip(Number(desde))//esto es para saltear el numero de los que ponga aca 
        .limit(Number(limite)) // lo paaso a numero

    const total = await Usuario.countDocuments( query ) // solo va a mostrar las que tengan estado: true  */


    const [total, usuarios] = await Promise.all([ //esto es lo mismo que lo de arriba
        Usuario.countDocuments( query ) ,
        Usuario.find( query ) // solo va a mostrar las que tengan estado: true
        .skip(Number(desde))//esto es para saltear el numero de los que ponga aca 
        .limit(Number(limite)) // lo paaso a numero


    ])
    //aca es para obtener todos los parametros

   /*  const query = req.query */

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async(req, res) => {

    //para obtener el /10 hacemos, seria 1 solo parametro

    const id = req.params.id
    const { _id, password, google, correo, ...resto} = req.body //el correo se hace de otra manera, para que no te manden un id porque revienta igual

    //TODO VALIDAR CONTRA BASE DE DATOS
    if(password) {
        // encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); // esto es para encriptarlo 10 veces
        resto.password = bcryptjs.hashSync( password, salt) // em este lo encriptamos y pasamos 2 parametros, el password y la cantidad de veces que es 10

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto ) // mongoose, id es lo que busca y resto es lo que actualiza
    
    
    res.json({
        msg:"hola",
        usuario
    })
}

const usuariosPost = async(req, res) => {

    //primero voy a confirmar mi middleware que cree en users.js

    const {nombre, correo, password, rol} = req.body // esta {} se hace para que solo el usuario pueda cambiar eso cuando ingresa
    //guardar un modelo

    const usuario = new Usuario( { nombre, correo, password, rol } ) // crea el modelo con lo que se ingreso en el body

    // encriptar contraseña

    const salt = bcryptjs.genSaltSync(); // esto es para encriptarlo 10 veces
    usuario.password = bcryptjs.hashSync( password, salt) // em este lo encriptamos y pasamos 2 parametros, el password y la cantidad de veces que es 10


    // guardat en DB


    try {
        await usuario.save(); //guarda el usuario
        console.log("el usuario fue guardado")
    } catch (error) {
        
        console.log("hubo un error")
        console.log(error)
        
    }
    
    res.json({ // este no me lo devuelve, no se porque
        usuario
    })
}

const usuariosDelete =  async (req, res) => {

    const {id} = req.params; 

    //lo que hago aca para borrarlo es poner el usuario con estado false, de esa manera se borra de la lista pero queda en mis registros de la base de datos

    const usuario = await Usuario.findByIdAndUpdate (id , {estado : false} );

    res.json(
            usuario
    )
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}