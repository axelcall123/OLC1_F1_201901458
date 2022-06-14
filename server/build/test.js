"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { LiteralVar } = require('./EvaJisonExp/literalVar');
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
    }
    test() {
    }
}
//IMPORTANTE ESTO SI NO NO SIRVE
const usuarioRuta = new Test();
exports.default = usuarioRuta.router;
