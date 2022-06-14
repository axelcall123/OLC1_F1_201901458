"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = void 0;
const expresion_1 = require("../Abstracto/expresion");
const typeOp_1 = require("../Tipos/typeOp");
const aritmeticaOp_1 = require("../Tipos/aritmeticaOp");
class Aritmetica extends expresion_1.Expresion {
    constructor(left, right, type, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.type = type;
    }
    ejecutar(tabla) {
        let result = {
            value: null,
            type: typeOp_1.Type.E
        };
        const nodoIzq = this.left.ejecutar(tabla);
        const nodoDer = this.right.ejecutar(tabla);
        if (this.type == aritmeticaOp_1.AritmeticaOp.MAS) {
            if (nodoDer.type == typeOp_1.Type.INT && nodoIzq.type == typeOp_1.Type.INT) {
                result = {
                    value: (nodoIzq.value + nodoDer.value),
                    type: typeOp_1.Type.INT
                };
            }
            else if (nodoDer.type == typeOp_1.Type.INT && nodoIzq.type == typeOp_1.Type.STRING
                || nodoDer.type == typeOp_1.Type.STRING && nodoIzq.type == typeOp_1.Type.INT) {
                result = {
                    value: (String(nodoIzq.value) + String(nodoDer.value)),
                    type: typeOp_1.Type.STRING
                };
            }
            else if (nodoIzq.type == typeOp_1.Type.STRING || nodoDer.type == typeOp_1.Type.STRING) {
                result = {
                    value: (String(nodoIzq.value) + String(nodoDer.value)),
                    type: typeOp_1.Type.STRING
                };
            }
            else if (nodoIzq.type == typeOp_1.Type.BOOLEAN && nodoDer.type == typeOp_1.Type.INT) {
                const val = nodoIzq.value ? 1 : 0;
                result = {
                    value: (val + nodoDer.value),
                    type: typeOp_1.Type.INT
                };
            }
            else if (nodoDer.type == typeOp_1.Type.BOOLEAN && nodoIzq.type == typeOp_1.Type.INT) {
                const val = nodoDer.value ? 1 : 0;
                result = {
                    value: (val + nodoIzq.value),
                    type: typeOp_1.Type.INT
                };
            }
            else if (nodoIzq.type == typeOp_1.Type.BOOLEAN || nodoDer.type == typeOp_1.Type.BOOLEAN) {
                const val1 = nodoIzq.value ? 1 : 0;
                const val2 = nodoDer.value ? 1 : 0;
                result = {
                    value: (val1 + val2),
                    type: typeOp_1.Type.INT
                };
            }
            //demas validadionces para la operaciones aritmeticas
        }
        else if (this.type == aritmeticaOp_1.AritmeticaOp.MENOS) {
            if (nodoDer.type == typeOp_1.Type.INT && nodoIzq.type == typeOp_1.Type.INT) {
                result = {
                    value: (nodoIzq.value - nodoDer.value),
                    type: typeOp_1.Type.INT
                };
            }
            //en la resta unicamente quiero con numeros
        }
        return result;
    }
}
exports.Aritmetica = Aritmetica;
