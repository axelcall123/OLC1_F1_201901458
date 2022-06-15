import { Expression } from "../abstract/express";
import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../symbols/enviroment";
import { Type } from "../symbols/type";

export class Declaracion extends Instruccion {
    constructor(
        public nombre: string,
        public tipo: string,
        public expresion : Expression,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public executar(env:Environment) {
        //codigo analisis semantico
        console.log("Declarando nueva variable: "+ this.nombre);
        //console.log(this);


        const expresion= this.expresion.executar(env);
        console.log(expresion);
        

        //preguntar si la variable esta libre

        if(env.buscar_variable(this.nombre)){
            //error semenaticos
            throw "Error semantico, la variable ya existe, y no se puede repetir en esta ts"
        }


        //si los tipos son correctos o hacen match

        // if(x.type==){
        //     //ingreso de la variable a la tabla simbolos
        // }
        // else{
        //     //reporte de error semantico
        // }

        env.guardar_variable(this.nombre,expresion.value,expresion.type)
        

        
    }
}