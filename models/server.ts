import express, {Application} from 'express';
import userRoutes from '../routes/usuario';
import cors from "cors";
import db from '../db/connection';

class Server {

    private app: Application;
    private port: String;
    //Enlazamos el controller y las rutas
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000'; //Si es undefinded le decimos que use el 8000 con el operador ||

        //Llamamos al metodo para conectarnos a la base de datos
        this.dbConnection();

        //Llamamos a los middlewares
        this.middlewares();

        //Definimos las rutas
        this.routes();
    }

    //Conectar base de datos
    async dbConnection() {

        try {
            await db.authenticate();
            console.log('Database Online');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    //Middlewares
    middlewares() {
        //CORS
        this.app.use(cors());//Para hacer peticiones cross-domain

        //Lectura del body
        this.app.use(express.json()); //Express va a hacer le parseo a json del body que mandemos en las peticiones

        //Carpeta Publica para servir contenido estático
        this.app.use(express.static('public'));
    }

    //Metodo para enlazar las rutas
    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    //Creamos el listen para levantar el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

//Podemos hacer una exportacion por defecto. Lo podemos hacer cuando tenemos una sola clase
export default Server;