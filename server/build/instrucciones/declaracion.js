"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const instruccion_1 = require("../Abstracto/instruccion");
class Declaracion extends instruccion_1.Instruccion {
    constructor(nombre, tipo, line, column) {
        super(line, column);
        this.nombre = nombre;
        this.tipo = tipo;
        this.line = line;
        this.column = column;
    }
    ejecutar() {
        //ANALISIS SEMANTICO
    }
}
exports.Declaracion = Declaracion;
