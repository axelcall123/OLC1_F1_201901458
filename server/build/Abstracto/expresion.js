"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expresion = void 0;
//E: E + E | E- E
class Expresion {
    constructor(line, column) {
        this.line = line;
        this.column = column;
        this.line = line;
        this.column = column + 1;
    }
}
exports.Expresion = Expresion;