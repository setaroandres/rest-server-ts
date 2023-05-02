"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        //Enlazamos el controller y las rutas
        this.apiPaths = {
            usuarios: '/api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000'; //Si es undefinded le decimos que use el 8000 con el operador ||
        //Llamamos al metodo para conectarnos a la base de datos
        this.dbConnection();
        //Llamamos a los middlewares
        this.middlewares();
        //Definimos las rutas
        this.routes();
    }
    //Conectar base de datos
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database Online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    //Middlewares
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)()); //Para hacer peticiones cross-domain
        //Lectura del body
        this.app.use(express_1.default.json()); //Express va a hacer le parseo a json del body que mandemos en las peticiones
        //Carpeta Publica para servir contenido estático
        this.app.use(express_1.default.static('public'));
    }
    //Metodo para enlazar las rutas
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_1.default);
    }
    //Creamos el listen para levantar el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}
//Podemos hacer una exportacion por defecto. Lo podemos hacer cuando tenemos una sola clase
exports.default = Server;
//# sourceMappingURL=server.js.map