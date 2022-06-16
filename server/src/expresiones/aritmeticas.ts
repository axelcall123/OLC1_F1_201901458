import { Expression } from "../abstract/express"
import { Retorno } from "../abstract/Retorno"
import { Environment } from "../symbols/enviroment"
import { Type } from "../symbols/type"
import { ArithmeticOption } from "./aritmeticOption"

export class Arithmetic extends Expression {

    constructor(
        private left: Expression,
        private right: Expression,
        private type: ArithmeticOption,
        line: number,
        column: number) {
        super(line, column)
    }

    public executar(env:Environment): Retorno {

        let result: Retorno ={
            value:null,
            type:Type.error
        }

        const nodoIzq = this.left.executar(env)
        const nodoDer = this.right.executar(env)

        if (this.type == ArithmeticOption.MAS) {

   
            if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.NUMBER) {
                result = { 
                    value: (nodoIzq.value + nodoDer.value), 
                    type: Type.NUMBER 
                }
            }else if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.STRING
                ||nodoDer.type == Type.STRING && nodoIzq.type == Type.NUMBER) {
                result = { 
                    value: (String(nodoIzq.value) + String(nodoDer.value)), 
                    type: Type.STRING 
                }
            }else if (nodoIzq.type == Type.STRING || nodoDer.type == Type.STRING ) {
                result = { 
                    value: (String(nodoIzq.value) + String(nodoDer.value)), 
                    type: Type.STRING 
                }
            }else if (nodoIzq.type == Type.BOOLEAN && nodoDer.type == Type.NUMBER ) {
                const val:number= nodoIzq.value? 1:0
                result = { 
                    value: ( val+nodoDer.value), 
                    type: Type.NUMBER 
                }
            }
            else if (nodoDer.type == Type.BOOLEAN && nodoIzq.type == Type.NUMBER ) {
                const val:number= nodoDer.value? 1:0
                result = { 
                    value: ( val+nodoIzq.value), 
                    type: Type.NUMBER 
                }
            }
            else if (nodoIzq.type == Type.BOOLEAN || nodoDer.type == Type.BOOLEAN ) {
                const val1:number= nodoIzq.value? 1:0
                const val2:number= nodoDer.value? 1:0
                result = { 
                    value: ( val1+val2), 
                    type: Type.NUMBER 
                }
            }

        }else if (this.type == ArithmeticOption.MENOS) {
            //INT INT
            if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.NUMBER) {
                result = { 
                    value: (nodoIzq.value - nodoDer.value), 
                    type: Type.NUMBER 
                }
                //INT DOUBLE
            } else if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.DOUBLE) {
                result = {
                    value: (nodoIzq.value - nodoDer.value),
                    type: Type.DOUBLE
                    
                }
                //INT CHAR
            } else if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (nodoIzq.value - nodoDer.value.charCodeAt(0)),
                    type: Type.NUMBER
                }
            }
                //DOUBLE INT
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (nodoIzq.value - nodoDer.value),
                    type: Type.DOUBLE
                }
            }
            //DOUBLE DOUBLE
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.DOUBLE) {
                result = {
                    value: (nodoIzq.value - nodoDer.value),
                    type: Type.DOUBLE
                }
            }
            //DOUBLE CHAR
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (nodoIzq.value - nodoDer.value.charCodeAt(0)),
                    type: Type.DOUBLE
                }
            }
            //CHAR INT
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) - nodoDer.value),
                    type: Type.NUMBER
                }
            }
            //CHAR DOUBLE
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.DOUBLE) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) - nodoDer.value),
                    type: Type.DOUBLE
                }
            }
            //CHAR CHAR
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) - nodoDer.value.charCodeAt(0)),
                    type: Type.NUMBER
                }
            }
            
            
            
        } else if (this.type == ArithmeticOption.MULTIPLICACION){
            //INT INT
            if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (nodoIzq.value * nodoDer.value),
                    type: Type.NUMBER
                }
                
            }
            //INT DOUBLE
            else if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.DOUBLE) {
                result = {
                    value: (nodoIzq.value * nodoDer.value),
                    type: Type.NUMBER
                }

            }
            //INT CHAR
            else if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (nodoIzq.value * nodoDer.value.charCodeAt(0)),
                    type: Type.NUMBER
                }

            }
            //DOUBLE INT
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (nodoIzq.value * nodoDer.value),
                    type: Type.DOUBLE
                }

            }
            //DOUBLE DOUBLE
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.DOUBLE) {
                result = {
                    value: (nodoIzq.value * nodoDer.value),
                    type: Type.DOUBLE
                }

            }
            //DOUBLE CHAR
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (nodoIzq.value * nodoDer.value.charCodeAt(0)),
                    type: Type.DOUBLE
                }

            }
            //CHAR INT
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) * nodoDer.value),
                    type: Type.NUMBER
                }

            }
            //CHAR DOUBLE
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.DOUBLE) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) * nodoDer.value),
                    type: Type.DOUBLE
                }

            }
            //CHAR CHAR
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) * nodoDer.value.charCodeAt(0)),
                    type: Type.DOUBLE
                }
            }
        } else if (this.type == ArithmeticOption.DIV) {
            //INT INT
            if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (nodoIzq.value / nodoDer.value),
                    type: Type.NUMBER
                }

            }
            //INT DOUBLE
            else if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.DOUBLE) {
                result = {
                    value: (nodoIzq.value / nodoDer.value),
                    type: Type.DOUBLE
                }

            }
            //INT CHAR
            else if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (nodoIzq.value / nodoDer.value),
                    type: Type.DOUBLE
                }

            }
            //DOUBLE INT
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (nodoIzq.value / nodoDer.value),
                    type: Type.DOUBLE
                }
            }
            //DOUBLE DOUBLE
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.DOUBLE) {
                result = {
                    value: (nodoIzq.value / nodoDer.value),
                    type: Type.DOUBLE
                }

            }
            //DOUBLE CHAR
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (nodoIzq.value / nodoDer.value.charCodeAt(0)),
                    type: Type.DOUBLE
                }

            }
            //CHAR INT
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) / nodoDer.value),
                    type: Type.NUMBER
                }

            }
            //CHAR DOUBLE
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) / nodoDer.value),
                    type: Type.DOUBLE
                }

            }
            //CHAR CHAR
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) / nodoDer.value),
                    type: Type.NUMBER
                }

            }
        } else if (this.type == ArithmeticOption.PORPOR) {
            //INT INT
            if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (Math.pow(nodoDer.value,nodoIzq.value)),
                    type: Type.DOUBLE
                }

            }
            //INT DOUBLE
            else if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.DOUBLE) {
                result = {
                    value: (Math.pow(nodoDer.value, nodoIzq.value)),
                    type: Type.DOUBLE
                }

            }
            //INT CHAR
            else if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (Math.pow(nodoDer.value, nodoIzq.value.charCodeAt(0))),
                    type: Type.DOUBLE
                }

            }
            //DOUBLE INT
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (Math.pow(nodoDer.value, nodoIzq.value)),
                    type: Type.DOUBLE
                }

            }
            //DOUBLE DOUBLE
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.DOUBLE) {
                result = {
                    value: (Math.pow(nodoDer.value, nodoIzq.value)),
                    type: Type.DOUBLE
                }

            }
            //DOUBLE CHAR
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (Math.pow(nodoDer.value, nodoIzq.value.charCodeAt(0))),
                    type: Type.DOUBLE
                }

            }
            //CHAR INT
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (Math.pow(nodoDer.value.charCodeAt(0), nodoIzq.value)),
                    type: Type.DOUBLE
                }

            }
            //CHAR DOUBLE
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.DOUBLE) {
                result = {
                    value: (Math.pow(nodoDer.value.charCodeAt(0), nodoIzq.value)),
                    type: Type.DOUBLE
                }

            }
            //CHAR CHAR
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (Math.pow(nodoDer.value.charCodeAt(0), nodoIzq.value.charCodeAt(0))),
                    type: Type.DOUBLE
                }

            }

        } else if (this.type == ArithmeticOption.MODULO) {
            //INT INT
            if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.NUMBER) {
                console.log(`------>${nodoDer.value} y ${nodoIzq.value}=${nodoDer.value%nodoIzq.value}`)
                result = {
                    value: (nodoIzq.value % nodoDer.value),
                    type: Type.DOUBLE
                }

            }
            //INT DOUBLE
             else if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.DOUBLE) {
                    result = {
                        value: (nodoDer.value % nodoIzq.value),
                        type: Type.DOUBLE
                    }

                }
            //INT CHAR
            else if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (nodoDer.value % nodoIzq.value.charCodeAt(0)),
                    type: Type.DOUBLE
                }

            }
            //DOUBLE INT
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (nodoDer.value % nodoIzq.value),
                    type: Type.DOUBLE
                }

            }
            //DOUBLE DOUBLE
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.DOUBLE) {
                result = {
                    value: (nodoDer.value % nodoIzq.value),
                    type: Type.DOUBLE
                }
            }
            //DOUBLE CHAR
            else if (nodoDer.type == Type.DOUBLE && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (nodoDer.value % nodoIzq.value.charCodeAt(0)),
                    type: Type.DOUBLE
                }
            }
            //CHAR INT
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.NUMBER) {
                result = {
                    value: (nodoDer.value.charCodeAt(0) % nodoIzq.value),
                    type: Type.DOUBLE
                }
            }
            //CHAR DOUBLE
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.DOUBLE) {
                result = {
                    value: (nodoDer.value.charCodeAt(0) % nodoIzq.value),
                    type: Type.DOUBLE
                }
            }
            //CHAR CHAR
            else if (nodoDer.type == Type.CHAR && nodoIzq.type == Type.CHAR) {
                result = {
                    value: (nodoDer.value.charCodeAt(0) % nodoIzq.value.charCodeAt(0)),
                    type: Type.DOUBLE
                }
            }
        }


        return result
    }


}

