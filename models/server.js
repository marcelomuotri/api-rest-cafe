require('dotenv').config();

const cors = require('cors')
const express = require('express');
const { dbConection } = require('../database/config.js');


class Server {

    constructor (){
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    this.conectarDB()

    //middlewares
    this.middlewares()
    //rutas de mi aplicacion
    this.routes()
    
    }

    //conectar a la base de datos
    async conectarDB(){
        await dbConection()
    }

    middlewares(){

        this.app.use(cors())

        //con este convertimos la info que nos mandan a json
        this.app.use(express.json())

        //con este servis el contenido estatico, directorio publico
        this.app.use( express.static('public') )

        
    }

    routes() {

        this.app.use('/api/usuarios' , require ('../router/user'))
    
    }
        

    

    listen(){
        this.app.listen(this.port, () => {
            console.log("servir corriendo en el puerto", this.port)
        })
    }

}

module.exports = Server;