import { AppDataSource } from "../data-source";
import { Router, Request, Response } from 'express'
const bcrypt = require("bcrypt");
import { Sistema_Caracteristicas } from "../entity/sistema_caracteristicas.entity";

export class Sistema_Caracteristicas_Controller {
    public router: Router

    constructor() {
        this.router = Router()
        this.routes();
    }

    /**APIs */

    /**
     * getSistema api para obetener todas las caracteristicas de cada sistema
     */
    public get_sistema = async (req: Request, res: Response) => {
        const result: any = await AppDataSource.manager.find(Sistema_Caracteristicas, {
            order: {
                siglas: "ASC"
            }
        })
        return res.status(200).send(result);
    }

    /**
     * addSistema api para annadir un nuevo sistema
     */
    public add_sistema = async (req: Request, res: Response) => {
        const sistema = req.body.sistema;
        const siglas = req.body.siglas;
        const descripcion = req.body.descripcion;
        const desarrollador = req.body.desarrollador;
        const lenguaje = req.body.lenguaje_programacion;
        const tipo = req.body.tipo;
        const url = req.body.url;
        const server_app = req.body.servidor_aplicacion;
        const base_datos = req.body.base_datos;
        const tipo_db = req.body.tipo_db;
        const server_db = req.body.servidor_base_datos;
        const admin = req.body.administrador;
        const areas_usuarias = req.body.areas_usuarias;
        const soporte = req.body.soporte;

        const sc = new Sistema_Caracteristicas()
        sc.sistema = sistema;
        sc.siglas = siglas;
        sc.descripcion = descripcion;
        sc.desarrollador = desarrollador;
        sc.lenguaje_programacion = lenguaje;
        sc.tipo = tipo;
        sc.url = url;
        sc.servidor_aplicacion = server_app;
        sc.base_datos = base_datos;
        sc.tipo_db = tipo_db;
        sc.servidor_base_datos = server_db;
        sc.administrador = admin;
        sc.areas_usuarias = areas_usuarias;
        sc.soporte = soporte,
            await AppDataSource.manager.save(Sistema_Caracteristicas, sc);
        return res.status(200).send({ message: 'Nuevo sistema agregado correctamente' });
        //error
    }

    /**
     * updateSistema api para atualizar los datos del sistema
     */
    public update_sistema = async (req: Request, res: Response) => {
        console.log(req.body);

        const sistema = req.body.sistema;
        const siglas = req.body.siglas;
        const descripcion = req.body.descripcion;
        const desarrollador = req.body.desarrollador;
        const lenguaje = req.body.lenguaje_programacion;
        const tipo = req.body.tipo;
        const url = req.body.url;
        const server_app = req.body.servidor_aplicacion;
        const base_datos = req.body.base_datos;
        const server_db = req.body.servidor_base_datos;
        const admin = req.body.administrador;
        const tipo_db = req.body.tipo_db;
        const soporte = req.body.soporte;

        await AppDataSource.manager.update(Sistema_Caracteristicas, req.params.id, {
            sistema: sistema,
            siglas: siglas,
            descripcion: descripcion,
            desarrollador: desarrollador,
            lenguaje_programacion: lenguaje,
            tipo: tipo,
            url: url,
            servidor_aplicacion: server_app,
            base_datos: base_datos,
            tipo_db: tipo_db,
            servidor_base_datos: server_db,
            administrador: admin,
            soporte: soporte,
        });
        return res.status(200).send({ message: 'Datos del sistema actualizados correctamente' });
        //error
    }

    /**
     * routes url para las llamadas a las apis
     */
    public routes() {
        this.router.get('/sistema', this.get_sistema);
        this.router.post('/sistema', this.add_sistema);
        this.router.put('/sistema/:id', this.update_sistema);
    }

}

