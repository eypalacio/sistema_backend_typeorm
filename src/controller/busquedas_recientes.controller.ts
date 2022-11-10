import { AppDataSource } from "../data-source";
import { Router, Request, Response} from "express";
const bcrypt = require("bcrypt");
/**import entities: */
import { Busquedas_Recientes } from "../entity/busquedas_recientes.entity";
import { Usuario } from "../entity/usuario.entity";
import { Token } from "../entity/token.entity";

export class Busquedas_Recientes_Controller{
    public router: Router;

    constructor(){
        this.router = Router();
    }

    /**
     * get_busquedas_recientes: api para mostrar las 10 ultimas busquedas.
     */
    public get_busquedas_recientes = async(req:Request, res: Response) => {
        const token = req.query.token;
        const id = req.query.usuario_id;

        const valid = await AppDataSource.manager.find(Token, {
            where: {
                token: token,
                usuario_id: id
            }
        })
        if(valid.length > 0){
            return res.status(200).send(await AppDataSource.manager.find(Busquedas_Recientes, {
                order: {fecha: "DESC"},
                where: {id_usuario: id}
            }))
        }else 
        return res.status(401).send("");
    }

    public add_busquedas_recientes = async(req:Request, res: Response) => {
        const token = req.query.token;
        const id = req.query.usuario_id;

        const valid = await AppDataSource.manager.find(Token, {
            where: {
                token: token,
                usuario_id: id
            }
        })
        if(valid.length > 0){
           const busq = await AppDataSource.manager.find(Busquedas_Recientes, {where: {id_usuario: id}})
            if (busq.length == 10) {
               await AppDataSource.manager.remove(Busquedas_Recientes, busq[0])
            }
            const id_usuario = req.body.id_usuario;
            const fecha = req.body.fecha;
            const busqueda = req.body.busqueda;
            const cant = req.body.cant;

            const br = new Busquedas_Recientes();
            br.id_usuario = id_usuario;
            br.busqueda = busqueda;
            br.fecha = fecha;
            br.cant = cant;

            await AppDataSource.manager.save(Busquedas_Recientes, br);
            return res.status(200).send("ok");
        }else 
        return res.status(401).send("");

    }

    /**
     * routes url para la llamada a las apis
    */
    public routes() {
        this.router.get('/busquedas_recientes', this.get_busquedas_recientes);
        this.router.post('/busquedas_recientes', this.add_busquedas_recientes);
    }

}