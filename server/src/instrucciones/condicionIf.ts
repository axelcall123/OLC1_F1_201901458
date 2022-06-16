import { Expression } from "../abstract/express";
import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../symbols/enviroment";

export class Sentencia_if extends Instruccion {
    constructor(
        public condicion:Expression,
        public bloque_verdadero: Instruccion,
        public bloque_falso: Instruccion,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public executar(env:Environment) {
       
        //confirmar que la expresion es de tipo booleana

        const x=this.condicion.executar(env);

        if(x.type==3){
            throw "Error semantico, el if necesita una condicion boolena";
        }
        ///en su proyecto tiene que hacer l avalidacion que unicamente pasen expresiones de tipo bool
        

        if(x.value==10){
            
            this.bloque_verdadero.executar(env)
        }else{
            this.bloque_falso.executar(env)
        }






        
    
        
    }
}

