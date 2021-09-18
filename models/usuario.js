

// aca es para crear la coleccion, contiene el modelo de los datos

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']

    },

    correo:{
        type:String,
        required: [true, 'El correo es obligatorio'],
        unique: true //tiene que ser un correo unico , no se puede repetir
    },

    password:{
        type:String,
        required: [true, 'La contraseña es obligatoria'],
        //tiene que ser un correo unico , no se puede repetir
    },

    img:{
        type:String,
        
    },

    rol:{
        type:String,
        required: true, 
        emun: ['ADMIN_ROLE', 'USER_ROLE'] //el rol tiene que ser uno o el otro
    },

    estado:{
        type: Boolean,
        default:true
    },

    google:{
        type:Boolean,
        default: false
    },

})

//aca yo puedo crearme metodos personales, como tambien sobrescribir los tojson y esos metodos existentes

// tiene que ser una funcion normal
UsuarioSchema.methods.toJSON = function() {
    const { __v, password , ...usuario } = this.toObject() // de esta manera yo estoy separando el password y laversion de la respuesta y todos los demas van a ser almacenados en usuario
    return usuario;
}


module.exports = model( 'Usuarios', UsuarioSchema )