"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //npm i @types/express
const morgan_1 = __importDefault(require("morgan")); //npm i @types/morgan
const cors_1 = __importDefault(require("cors")); //npm i @types/cors
const test_1 = __importDefault(require("./test"));
const GetFlp_1 = __importDefault(require("./Funciones/GetFlp"));
const fs = require("fs");
const parser = require('./jison/gramatica');
//import multipart from 'connect-multiparty';//npm i @types/connect-multiparty
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 1000); //PUERTO DEFINIDO TOMALO
        this.app.use((0, morgan_1.default)('dev')); //TODO: DEV SIRVE PARA VER LO QUE PIDE EL USUARIO XD
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json()); //PERMITE APLICACIONES FORMATO JSON COMO ANGULAR
        this.app.use(express_1.default.urlencoded({ extended: false })); //FORMULARIO HTML
        this.app.get('/HI', (req, res) => {
            res.json({ mensaje: "HI" });
        });
    }
    routes() {
        this.app.use('/TEST', test_1.default);
        this.app.use('/GetFlp', GetFlp_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server encendido', this.app.get('port'));
        });
    }
    leer() {
        //const entrada =fs.reaFileSync('hola');
        //const ast=parser.parse(entrada.toString);
        //for(const elemento of ast){
        //    elemento.ejecutar();
        //}
    }
}
const server = new Server(); //OBJETO GUARDAR ESTE OBJETO Server
server.start(); //
