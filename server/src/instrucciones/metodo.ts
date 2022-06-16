import { Expression } from "../abstract/express";
import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../symbols/enviroment";

export class metodo extends Instruccion {
    constructor(
        public id:string,
        public parametros:any,
        public bloque: Instruccion,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public executar(env:Environment) {
       
        //semantica

        //asignacion parecida a la de varibles, envez de guardar variables, estoy guardando funciones/metodods

        env.guardar_funcion(this.id, this);


    }
}

