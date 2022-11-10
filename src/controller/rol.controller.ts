import { AppDataSource } from "../data-source";
import { Router, Request, Response } from 'express';
const bcrypt = require("bcrypt");
import { Rol } from "../entity/rol.entity";
import { Token } from "../entity/token.entity";

export class Rol_Controller {
    public router: Router

    constructor() {
        this.router = Router();
        this.routes();
    }


    /**
     * get_usuarios
     */
    public get_rol = async (req: Request, res: Response) => {
        const token = req.query.token;
        const id = req.query.usuario_id;

        const valid = await AppDataSource.manager.find(Token, {
            where: {
                token: token,
                usuario_id: id
            }
        })

        if (valid.length > 0) {
            return res.status(200).send(await AppDataSource.manager.find(Rol, {
                order: {
                    nombre_rol: "ASC"
                },
            }));
        } else return res.status(401).send("")
    }

    /**
 * get_usuarios
 */
    public update_rol = async (req: Request, res: Response) => {
        const token = req.query.token;
        const id = req.query.usuario_id;
        const rol = req.body.rol;

        const valid = await AppDataSource.manager.find(Token, {
            where: {
                token: token,
                usuario_id: id
            }
        })

        if (valid.length > 0) {
            await AppDataSource.manager.update(Rol, req.params.id, {
                nombre_rol: rol,
            })
            return res.status(200).send("ok")
        } else return res.status(401).send("")
    }

    /**
* get_usuarios
*/
    public delete_rol = async (req: Request, res: Response) => {
        const token = req.query.token;
        const id = req.query.usuario_id;

        const valid = await AppDataSource.manager.find(Token, {
            where: {
                token: token,
                usuario_id: id
            }
        })

        if (valid.length > 0) {
            const delet = await AppDataSource.manager.findOne(Rol, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Rol, delet) });
        
        } else return res.status(401).send("")
    }

    /**
* get_usuarios
*/
    public add_rol = async (req: Request, res: Response) => {
        const token = req.query.token;
        const id = req.query.usuario_id;

        const n_rol = req.body.nombre_rol;

        const valid = await AppDataSource.manager.find(Token, {
            where: {
                token: token,
                usuario_id: id
            }
        })
        if (valid.length > 0) {
            if (await (await AppDataSource.manager.find(Rol, { where: { nombre_rol: n_rol } })).length == 0) {

                const rol = new Rol();
                rol.nombre_rol = n_rol;
                await AppDataSource.manager.save(Rol, rol);
                return res.status(200).send({ message: 'Rol agregado correctamente' });
            } else
                return res.status(400).send({ message: 'El rol ya esta siendo usado' });

        }
        else
            return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public routes() {
        this.router.get('/usuario', this.get_rol);
        this.router.delete('/usuario/:id', this.delete_rol);
        this.router.post('/usuario', this.add_rol);
        this.router.put('/usuario/:id', this.update_rol);
    }
}