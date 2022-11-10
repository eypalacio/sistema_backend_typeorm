import { Busquedas_Recientes_Controller } from "./controller/busquedas_recientes.controller";
import { LoginController } from "./controller/login.controller";
import { Rol_Controller } from "./controller/rol.controller";
import { Sistema_Caracteristicas_Controller } from "./controller/sistema_caracteristicas.controller";
import { Sistema_Usuarios_Controller } from "./controller/sistema_usuarios.controller";
import { Usuario_Controller } from "./controller/usuario.controller";
import { VideoConferenciaController } from "./controller/videoconferencia.controller";
import { AppDataSource } from "./data-source"
import { Sistema_Caracteristicas } from "./entity/sistema_caracteristicas.entity";

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = 9608;

AppDataSource.initialize().then(async () => {

    app.use(cors());

    // Configuring body parser middlewares
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Configuracion para subir imagenes
    app.use(fileUpload());

    /** Importar ruta de los controladores: const var_controller = new Var_Controller(); */
    /** guide:
    var routes = require('./url/url');
    const inicio = require('./controllers/apis');
    const user_controller = new UsuarioController();
    const login_controller = new LoginController();
    const videoconferencia_controller = new VideoConferenciaController();
     */

    const usuario_controller = new Sistema_Usuarios_Controller();
    const caracteristicas_controller = new Sistema_Caracteristicas_Controller();
    const busq_rec_controller = new Busquedas_Recientes_Controller();
    const user_controller = new Usuario_Controller();
    const login_controller = new LoginController();
    const rol_controller = new Rol_Controller();
    

    /**Cargar las rutas de las apis */
    /** guide:
    app.use('/apis', user_controller.router);
    app.use('/apis', login_controller.router);
    app.use('/apis', videoconferencia_controller.router);
     */

    app.use('/apis', usuario_controller.router);
    app.use('/apis', caracteristicas_controller.router);
    app.use('/apis', busq_rec_controller.router);
    app.use('/apis', user_controller.router);
    app.use('/apis', login_controller.router);
    app.use('/apis', rol_controller.router);
    app.get('/apis', function (req, res) {
        console.log('sss');

    });


    module.exports = app;

    // console.log("Inserting a new user into the database...")
    // const user = new Usuario()
    // user.usuario = "Timber"
    // user.nombre = "Saw"
    // user.ultima_session = "25"
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(Usuario)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")
    console.log('successful conection to database');

    app.listen(port, () => console.log(`server is listenig on port: ${port}!`));


}).catch(error => console.log(error))
