import { Expresion } from "../Abstracto/expresion"
import { Retorno } from "../Abstracto/SIRetorno"
import { Type } from "../Tipos/typeOp"

export class LiteralVar extends Expresion {

    constructor(
        private value: any,
        private type: Type,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public ejecutar(): Retorno {

        if (this.type == Type.INT)
            return { value: Number(this.value), type: Type.INT }
        
        else if (this.type == Type.DOUBLE) {
            return { value: parseFloat(this.value),type: Type.INT}
         }

        else if (this.type == Type.STRING) {//FIXME:arreglar lo de \"
            this.value = (this.value).replaceAll("\"", "")
            return { value: this.value, type: Type.STRING }
        }

        else if(this.type==Type.CHAR){
            this.value =(this.value).replaceAll("\'","")
            return{ value: this.value, type: Type.CHAR}
        }

        else if (this.type == Type.BOOLEAN) {
            if (this.value == "true") return { value: Boolean(true), type: Type.BOOLEAN }
            else return { value: Boolean(false), type: Type.BOOLEAN }
        }

        else return { value: this.value, type: Type.E }
    }
}