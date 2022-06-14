"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteralVar = void 0;
const expresion_1 = require("../Abstracto/expresion");
const typeOp_1 = require("../Tipos/typeOp");
class LiteralVar extends expresion_1.Expresion {
    constructor(value, type, line, column) {
        super(line, column);
        this.value = value;
        this.type = type;
    }
    ejecutar() {
        if (this.type == typeOp_1.Type.INT)
            return { value: Number(this.value), type: typeOp_1.Type.INT };
        else if (this.type == typeOp_1.Type.DOUBLE) {
            return { value: parseFloat(this.value), type: typeOp_1.Type.INT };
        }
        else if (this.type == typeOp_1.Type.STRING) { //FIXME:arreglar lo de \"
            this.value = (this.value).replaceAll("\"", "");
            return { value: this.value, type: typeOp_1.Type.STRING };
        }
        else if (this.type == typeOp_1.Type.CHAR) {
            this.value = (this.value).replaceAll("\'", "");
            return { value: this.value, type: typeOp_1.Type.CHAR };
        }
        else if (this.type == typeOp_1.Type.BOOLEAN) {
            if (this.value == "true")
                return { value: Boolean(true), type: typeOp_1.Type.BOOLEAN };
            else
                return { value: Boolean(false), type: typeOp_1.Type.BOOLEAN };
        }
        else
            return { value: this.value, type: typeOp_1.Type.E };
    }
}
exports.LiteralVar = LiteralVar;
