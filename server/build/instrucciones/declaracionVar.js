"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const instruccion_1 = require("../Abstracto/instruccion");
class Declaracion extends instruccion_1.Instruccion {
    constructor(nombre, tipo, expresion, line, //ESTA EN INSTUCCION
    column //ESTA EN INSTRUCCION
    ) {
        super(line, column);
        this.nombre = nombre;
        this.tipo = tipo;
        this.expresion = expresion;
    }
    ejecutar(tabla) {
        //ANALISIS SEMANTICO
        console.log("Declarando nueva variable: " + this.nombre);
        const expresion = this.expresion.ejecutar(tabla);
        console.log(expresion);
        tabla.guardar_variable(this.nombre, expresion.value, expresion.type);
    }
}
exports.Declaracion = Declaracion;
