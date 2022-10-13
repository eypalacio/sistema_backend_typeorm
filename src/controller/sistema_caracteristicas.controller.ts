import { AppDataSource } from "../data-source";
import { Router, Request, Response } from 'express'
const bcrypt = require("bcrypt");
import { Sistema_Caracteristicas } from "../entity/sistema_caracteristicas.entity";

export class Sistema_Caracteristicas_Controller {
    public router: Router

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * getSistema metodo para obetener todas las caracteristicas del sistema
     */
    public getSistema = async (req: Request, res: Response) => {
        const result: any = await AppDataSource.manager.find(Sistema_Caracteristicas, {
            order: {
                sistema: "ASC"
            }
        })
        return res.status(200).send(result);
    }

    /**
     * addSistema metodo para annadir un nuevo sistema
     */
    public addSistema = async (req: Request, res: Response) => {
        const sistema = req.body.nombre;
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
        sc.servidor_base_datos = server_db;
        sc.administrador = admin;
        await AppDataSource.manager.save(Sistema_Caracteristicas, sc);
        return res.status(200).send({ message: 'Nuevo sistema agregado correctamente' });
        //error
    }

    /**
     * updateSistema metodo para atualizar los datos del sistema
     */
    public updateSistema = async (req: Request, res: Response) => {
        const sistema = req.body.nombre;
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
            servidor_base_datos: server_db,
            administrador: admin,
        });
        return res.status(200).send({ message: 'Datos del sistema actualizados correctamente' });
        //error
    }

    public routes() {
        this.router.get('/sistema', this.getSistema);
        this.router.post('/sistema', this.addSistema);
        this.router.put('/sistema/:id', this.updateSistema);
    }
}

