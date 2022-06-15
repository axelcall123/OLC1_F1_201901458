import { tablaGSimbolos } from "./tablaGeneral"
export abstract class Instruccion{
    constructor(public line: number, public column:number){
        this.line=line;
        this.column=column+1;
    }
    public abstract ejecutar(tabla: tablaGSimbolos): any//NO ME IMPORTA LO QUE IMPORTA POR SE INSTRUCCION
}