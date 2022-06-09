"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class setJison {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    ;
    //get obtener
    //set leer
    config() {
        this.router.post('/Express', function (req, res) {
            incrementando: String = req.body.jison;
            res.json({ mensaje: `incrementando ` });
            res.send('hola');
        });
    }
}
