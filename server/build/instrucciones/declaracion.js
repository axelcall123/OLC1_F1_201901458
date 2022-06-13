"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const instruccion_1 = require("../Abstracto/instruccion");
class Declaracion extends instruccion_1.Instruccion {
    constructor(nombre, tipo, line, //ESTA EN INSTUCCION
    column //ESTA EN INSTRUCCION
    ) {
        super(line, column);
        this.nombre = nombre;
        this.tipo = tipo;
    }
    ejecutar() {
        //ANALISIS SEMANTICO
        console.log("Declarando nueva variable: " + this.nombre);
        console.log(this);
    }
}
exports.Declaracion = Declaracion;
