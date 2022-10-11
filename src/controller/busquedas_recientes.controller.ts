import { AppDataSource } from "../data-source";
import { Router, Reques, Response} from "express";
import { request } from "http";
const bcrypt = require("bcrypt");
/**import entities: */
import { Busquedas_Recientes } from "../entity/busquedas_recientes.entity";
import { Usuario } from "../entity/usuario.entity";

export class Busquedas_Recientes_Controller{
    public router: Router;

    constructor(){
        this.router = Router();
    }

    /**
     * get_busquedas_recientes: api para mostrar las 10 ultimas busquedas.
     */
    public get_busquedas_recientes = async() => {
        
    }

    /**
     * routes url para la llamada a las apis
    */
    public routes() {
        this.router.get('/busquedas_recientes', this.get_busquedas_recientes);
    }

}