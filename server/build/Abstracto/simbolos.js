"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Symbol = void 0;
class Symbol {
    constructor(value, id, type, editable) {
        this.value = value;
        this.id = id;
        this.type = type;
        this.editable = editable;
    }
}
exports.Symbol = Symbol;
