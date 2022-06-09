"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class GetJison {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    ;
    //get obtener
    //set leer
    config() {
        this.router.post('/Express', function (req, res) {
            var jisonStr = req.body.jison;
            res.json({ mensaje: `flp obtenido ${jisonStr}` });
        });
    }
}
//IMPORTANTE ESTO SI NO NO SIRVE
const usuarioRuta = new GetJison();
exports.default = usuarioRuta.router;
