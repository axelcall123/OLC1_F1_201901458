import express, { Application } from 'express';//npm i @types/express
import morgan from 'morgan';//npm i @types/morgan
import cors from 'cors';//npm i @types/cors
class Server {//PASO 1
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void {
        this.app.set('port', process.env.PORT || 1000);//PUERTO DEFINIDO TOMALO
        this.app.use(morgan('dev'));//TODO: DEV SIRVE PARA VER LO QUE PIDE EL USUARIO XD
        this.app.use(cors());
        this.app.use(express.json());//PERMITE APLICACIONES FORMATO JSON COMO ANGULAR
        this.app.use(express.urlencoded({ extended: false }));//FORMULARIO HTML
        this.app.get('/HI', (req, res) => {
            res.json({ mensaje: "HI" })
        });
    }
    routes(): void {//TODAS LAS FUNCIONES
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('server encendido', this.app.get('port'));
        });
    }
}
const server = new Server();//OBJETO GUARDAR ESTE OBJETO Server
server.start();//