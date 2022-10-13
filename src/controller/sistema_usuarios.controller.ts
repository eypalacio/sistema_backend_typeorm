import { AppDataSource } from "../data-source";
import { Router, Request, Response} from 'express';
const bcrypt = require("bcrypt");
import { Sistema_Caracteristicas } from "../entity/sistema_caracteristicas.entity";
import { Sistema_Usuarios } from "../entity/sistema_usuarios.entity";

export class Sistema_Usuarios_Controller {
    public router: Router

    constructor(){
        this.router = Router();
        this.routes();
    }

    /**APIs */

    /**
     * get_usuarios: api para obtener a todos los usuarios de todos los sitemas, se ordenaran segun nombre del sistema de forma ascendente.
     *  el filtro de la busqueda sera desde el frontend (criterios de busqueda: usuario, nombre de usuario, siglas del sistema, nombre de sistema)
     */
    public get_usuarios = async(req: Request, res: Response) => {
        const result: any = await AppDataSource.manager.find(Sistema_Usuarios, {
            order:{
                nombre_sistema: "ASC"
            }
        })
    }

    /**
     * routes url para la llamada al api
     */
    public routes() {
        this.router.get('/sistema-ususarios', this.get_usuarios)
    }
}