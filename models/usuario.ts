import { DataTypes } from 'sequelize';
import db from '../db/connection';

//Aca definimos el modelo para establecer como va a lucir cualquier usuario que quiera manejar dentro de la app
const Usuario = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
});

export default Usuario;