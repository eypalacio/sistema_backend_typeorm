import "reflect-metadata"
import { DataSource } from "typeorm"
import { Busquedas_Recientes } from "./entity/busquedas_recientes.entity";
import { Sistema_Caracteristicas } from "./entity/sistema_caracteristicas.entity";
import { Sistema_Usuarios } from "./entity/sistema_usuarios.entity";
import { Token } from "./entity/token.entity";
import { Usuario } from "./entity/usuario.entity";
import { VideoConferencia } from "./entity/videoconferencia.entity";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "eypalacio",
    password: "123456789",
    database: "SISTEMAS_BFI",
    synchronize: true,
    options: { encrypt: false },
    logging: false,
    entities: [Usuario, Busquedas_Recientes, Token, Sistema_Caracteristicas, Sistema_Usuarios],
    migrations: [],
    subscribers: [],
})