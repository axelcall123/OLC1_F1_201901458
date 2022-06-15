import { Retorno } from "./SIRetorno"
import { tablaGSimbolos } from "./tablaGeneral"
//E: E + E | E- E
export abstract class Expresion{
    constructor(public line: number, public column: number) {
        this.line = line
        this.column = column + 1
    }
    public abstract ejecutar(tabla: tablaGSimbolos): Retorno//SI ME IMPORTA LO QUE IMPORTO POR SER UNA EXPRESION
}