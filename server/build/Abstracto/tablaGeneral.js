"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tablaGSimbolos = void 0;
const simbolos_1 = require("./simbolos");
const typeOp_1 = require("../Tipos/typeOp");
class tablaGSimbolos {
    //TABLA DE VARAIBLES
    constructor(anterior) {
        this.anterior = anterior;
        this.tablaSimbolos = new Map();
    }
    getEnv() {
        return this.tablaSimbolos;
    }
    guardar_variable(nombre, valor, type) {
        if (!this.buscar_variable(nombre)) {
            //FIMXE:
            this.tablaSimbolos.set(nombre, new simbolos_1.Symbol(valor, nombre, type, false));
            return true;
        }
        console.log("esta variable [" + nombre + "] ya existe...");
        return false;
    }
    buscar_variable(nombre) {
        for (let entry of Array.from(this.tablaSimbolos.entries())) {
            if (entry[0] == nombre)
                return true;
        }
        return false;
    }
    getTipo_variable(nombre) {
        for (let entry of Array.from(this.tablaSimbolos.entries())) {
            if (entry[0] == nombre)
                return entry[1].type;
        }
        return typeOp_1.Type.E;
    }
    actualizar_variable(nombre, new_valor) {
        for (let entry of Array.from(this.tablaSimbolos.entries())) {
            if (entry[0] == nombre) {
                entry[1].value = new_valor;
            }
        }
    }
}
exports.tablaGSimbolos = tablaGSimbolos;
