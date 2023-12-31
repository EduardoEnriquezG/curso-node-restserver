const express = require('express');
const cors = require('cors');
const { dbConnect } = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();

    }

    async conectarDB() {
        await dbConnect();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Directorio Público
        this.app.use(express.static('public'));
        //Lectura y parseo del body
        this.app.use( express.json() )
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto, ', this.port);
        });
    }
}

module.exports = Server;