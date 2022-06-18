"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//const {LiteralVar} = require('./EvaJisonExp/literalVar');
//import {tablaGSimbolos} from './Abstracto/tablaGeneral'
const enviroment_1 = require("./symbols/enviroment");
const parser = require('./Zjison/gramatica');
class Test {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    ;
    config() {
        var incrementando = 0;
        this.router.get('/', (req, res) => res.json({ hola: 'wamos' }));
        this.router.get('/masmasExpress', function (req, res) {
            incrementando++;
            res.json({ mensaje: 'incrementando i' });
        });
        this.router.get('/GetIncrementoExpress', function (req, res) {
            res.json({ resultado: incrementando });
        });
        //SUBIR
        this.router.post('/SetIncrementoExpress', function (req, res) {
            incrementando = req.body.numero;
            res.json({ mensaje: `incrementando ${incrementando}` });
            res.send('hola');
        });
        //OTENER TEXTAREA
        var txt = "let";
        this.router.post('/SetTxtAreaExpress', function (req, res) {
            txt = req.body.txtarea; //->se lo envio desde usuario service/getTxtAreaService
            res.json({ mensaje: `E:vieneAngular<-------- ${txt}` });
            //INTENTO DE LEER LO QUE ENVIO
            console.log(`TXT ENVIADO ${txt}`);
            const ast = parser.parse(txt);
            const env_padre = new enviroment_1.Environment(null);
            for (const elemento of ast) {
                try {
                    elemento.executar(env_padre);
                }
                catch (error) {
                    //Singleton.add_errores(error)
                }
            }
        });
        this.router.get('/GetTxtAreaSaludoExpress', function (req, res) {
            res.json({ mensaje: `E:reenviadoAngular--------> ${txt}` });
        });
    }
    test() {
    }
}
//IMPORTANTE ESTO SI NO NO SIRVE
const usuarioRuta = new Test();
exports.default = usuarioRuta.router;
