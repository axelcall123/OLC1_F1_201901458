import express, { Application } from 'express';//npm i @types/express
import morgan from 'morgan';//npm i @types/morgan
import cors from 'cors';//npm i @types/cors
import TEST from './test';
import GetFlp from './FuncServer/GetFlp';
//import { tablaGSimbolos } from "./Abstracto/tablaGeneral"
//import { incremento } from './funcionesEx/incremento'

const fs=require("fs");


//import multipart from 'connect-multiparty';//npm i @types/connect-multiparty

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
            res.json({ mensaje: "HIS" })//LO ENVIO ANGULAR DESDE getSaludoService
        });
    }
    routes(): void {//TODAS LAS FUNCIONES
        this.app.use('/TEST', TEST);
        this.app.use('/GetFlp', GetFlp);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('server encendido->', this.app.get('port'));
        });
    }
    test(): void{
        //const tt:String=incremento("10--");
        //console.log(`holas ${tt}`);
    }
    leer():void{
        
    }
    
}
const server = new Server();//OBJETO GUARDAR ESTE OBJETO Server
server.start();//
server.test();
server.leer();