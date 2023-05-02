import dotenv from "dotenv";
import Server from "./models/server";

//Confiramos dotenv
dotenv.config();

const server = new Server();

//Aca, en nuestro archivo raiz, ponemos a escuchar y en marcha el server
server.listen();

//PARA LEVANTAR LA APP
/**
 * DEBEMOS COMPILAR LA APP (comando tsc) - Lo compila a js y lo pone en la carpeta dist
 * Y desp lanzamos -> nodemon dist/app.js (Asi lanzamos el app.js ya compilado a js)
 * 
 * TBN LO PODEMOS HACER AUTOMATICO, PARA NO ANDAR COMPIPLANDO CADA VEZ
 * 1. Abrimos una nueva terminal
 * 2. vamos a la carpeta de nuestro proyecto
 * 3. y ejecutamos tsc --watch
 * 4. tenemos una consola con el --watch y la otra con los mensajes de app
 * 
 */