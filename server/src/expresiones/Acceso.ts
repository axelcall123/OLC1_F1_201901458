import { Expression } from "../abstract/express";
import { Retorno } from "../abstract/Retorno";
import { Environment } from "../symbols/enviroment";
import { Type } from "../symbols/type";

export class Acceso extends Expression {
    constructor(
        private id: string,
        line: number,
        column: number

    ) {
        super(line, column) 
    }

    public executar(env: Environment): Retorno {



        //preguntar si exite variable
        //sino existe 
        //error semanticos



        

        const variable_ts= env.get_variable(this.id)


        if(variable_ts== null|| variable_ts== undefined){
            //errores semaintics
            throw "Error semantico, esta variable no existe! :c"
        }



        return {
            value: variable_ts.value,
            type: variable_ts.type
        }

        



    }
}