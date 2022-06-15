import { Expression } from "../abstract/express";
import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../symbols/enviroment";
import { Type } from "../symbols/type";

export class Declaracion extends Instruccion {
    constructor(
        public nombre: string,
        public expresion : Expression,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public executar(env:Environment) {
       
    
        //env.getTipo_variable()
        env.actualizar_variable(this.nombre,10);
        
    }
}