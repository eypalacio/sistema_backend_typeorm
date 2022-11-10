import { AppDataSource } from "../data-source";
import { Router, Request, Response } from 'express';
const bcrypt = require("bcrypt");
import { Usuario } from "../entity/usuario.entity";
import { Sistema_Usuarios } from "../entity/sistema_usuarios.entity";
import { Token } from "../entity/token.entity";

export class Usuario_Controller {
    public router: Router

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * get_usuarios
     */
    public get_usuarios = async (req: Request, res: Response) => {
        const token = req.query.token;
        const id = req.query.usuario_id;

        const valid = await AppDataSource.manager.find(Token, {
            where: {
                token: token,
                usuario_id: id
            }
        })

        if (valid.length > 0) {
            return res.status(200).send(await AppDataSource.manager.find(Usuario, {
                order: {
                    usuario: "ASC"
                },
            }));
        } else return res.status(401).send("")
    }

    /**
 * get_usuarios
 */
    public update_usuarios = async (req: Request, res: Response) => {
        const token = req.query.token;
        const id = req.query.usuario_id;

        const usuario = req.body.usuario;
        const nombre = req.body.nombre;
        const rol = req.body.rol;

        const valid = await AppDataSource.manager.find(Token, {
            where: {
                token: token,
                usuario_id: id
            }
        })

        if (valid.length > 0) {
            await AppDataSource.manager.update(Usuario, req.params.id, {
                nombre: nombre,
                usuario: usuario,
                rol: rol,
            })
            return res.status(200).send("ok")
        } else return res.status(401).send("")
    }

    /**
* get_usuarios
*/
    public delete_usuarios = async (req: Request, res: Response) => {
        const token = req.query.token;
        const id = req.query.usuario_id;

        const valid = await AppDataSource.manager.find(Token, {
            where: {
                token: token,
                usuario_id: id
            }
        })

        if (valid.length > 0) {
            const delet = await AppDataSource.manager.find(Usuario, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Usuario, delet) });
        }
        else return res.status(401).send("")
    }

    /**
* get_usuarios
*/
    public add_usuarios = async (req: Request, res: Response) => {
        const token = req.query.token;
        const id = req.query.usuario_id;

        const usuario = req.body.usuario;
        const nombre = req.body.nombre;
        const rol = req.body.rol;
        const fecha_registro = req.body.fecha_registro;
        const password = "12345678"

        const valid = await AppDataSource.manager.find(Token, {
            where: {
                token: token,
                usuario_id: id
            }
        })
        if (valid.length > 0) {
            if (await (await AppDataSource.manager.find(Usuario, { where: { usuario: usuario } })).length == 0) {
                bcrypt.hash(password, 10, async (err, encrypted) => {
                    if (err) {
                        return res.status(500).send({ message: 'En estos momentos no se puede por favor intentelo mas tarde' });
                    } else {
                        const user = new Usuario();
                        user.usuario = usuario;
                        user.password = encrypted;
                        user.nombre = nombre;
                        user.rol = rol;
                        user.fecha_registro = new Date();
                        user.ultima_sesion = new Date();
                        await AppDataSource.manager.save(Usuario, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
                    }
                });
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' });
        } else
            return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }


    public routes() {
        this.router.get('/usuario', this.get_usuarios);
        this.router.delete('/usuario/:id', this.delete_usuarios);
        this.router.post('/usuario', this.add_usuarios);
        this.router.put('/usuario/:id', this.update_usuarios);
    }
}
