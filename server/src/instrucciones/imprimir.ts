
import { Expression } from "../abstract/express";
import { Instruccion } from "../abstract/instruccion";
import { Singleton } from "../patron_singleton/singleton";
import { Environment } from "../symbols/enviroment";


export class Imprimir extends Instruccion {
    constructor(        
        public expresion : Expression,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public executar(env:Environment) {

        //console.log(this.expresion) 
        //console.log("---------------");
        
        const tmp= this.expresion.executar(env);
        // console.log(tmp);
        // console.log(tmp.type); 
        //console.log(">>",tmp.value); //esto es lo que tienen que mostrar al usuario
        
        const s= Singleton.getInstance()
        s.add_consola(tmp.value+"\n")
        
    }
}