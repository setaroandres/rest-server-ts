import { Router } from "express";
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/usuarios";

const router = Router();//Es igual al resultado de la fcn Router()

//Definimos las rutas de nuestro server
//TODO: Validar con Middlewares
router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);



export default router;