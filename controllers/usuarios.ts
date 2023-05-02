import { Request, Response } from "express";
import Usuario from "../models/usuario";



export const getUsuarios = async(req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json(
        usuarios
    );
}

export const getUsuario = async(req: Request, res: Response) => {

    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        res.status(404).json({
            msg: `No existe el usuario con id ${id}`
        })
    } else {
        res.json(
            usuario 
        );
    }
}

export const postUsuario = async(req: Request, res: Response) => {

    const {body} = req;

    try {
        
        const existeMail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if(existeMail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email: ${body.email}`
            });
        }

        const usuario = Usuario.build(body);
        await usuario.save();

        res.json(usuario);


    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Error Hable - con el administrador'
        });
    }
}

export const putUsuario = async(req: Request, res: Response) => {

    const {body} = req;
    const {id} = req.params;

    try {

        const usuario = await Usuario.findByPk(id);
        
        if (!usuario) {
            return res.status(400).json({
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        
        const existeMail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if(existeMail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email: ${body.email}`
            });
        }

        await usuario.update(body);

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Error Hable - con el administrador'
        });
    }
}

export const deleteUsuario = async(req: Request, res: Response) => {

    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);
        
    if (!usuario) {
        return res.status(400).json({
            msg: `No existe un usuario con el id: ${id}`
        });
    }

    //Eliminacion fisica
    //await usuario.destroy();

    //Eliminacion logica
    await usuario.update({estado: false});

    res.json(usuario);
}