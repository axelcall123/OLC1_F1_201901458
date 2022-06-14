import { Type } from "../Tipos/typeOp";

export class Symbol {
    constructor(public value: any, public id: string, public type: Type,public editable:Boolean) { }
}