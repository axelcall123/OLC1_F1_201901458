import { Expresion } from "../Abstracto/expresion"
import { Retorno } from "../Abstracto/SIRetorno"
import { tablaGSimbolos } from "../Abstracto/tablaGeneral"
import { Type } from "../Tipos/typeOp"
import { AritmeticaOp } from "../Tipos/aritmeticaOp"

export class Aritmetica extends Expresion {

    constructor(
        private left: Expresion,
        private right: Expresion,
        private type: AritmeticaOp,
        line: number,
        column: number) {
        super(line, column)
    }

    public ejecutar(tabla: tablaGSimbolos): Retorno {

        let result: Retorno = {
            value: null,
            type: Type.E
        }
        const nodoIzq = this.left.ejecutar(tabla)
        const nodoDer = this.right.ejecutar(tabla)
        
        if (this.type == AritmeticaOp.MAS) {


            if (nodoDer.type == Type.INT && nodoIzq.type == Type.INT) {
                result = {
                    value: (nodoIzq.value + nodoDer.value),
                    type: Type.INT
                }
            } else if (nodoDer.type == Type.INT && nodoIzq.type == Type.STRING
                || nodoDer.type == Type.STRING && nodoIzq.type == Type.INT) {
                result = {
                    value: (String(nodoIzq.value) + String(nodoDer.value)),
                    type: Type.STRING
                }
            } else if (nodoIzq.type == Type.STRING || nodoDer.type == Type.STRING) {
                result = {
                    value: (String(nodoIzq.value) + String(nodoDer.value)),
                    type: Type.STRING
                }
            } else if (nodoIzq.type == Type.BOOLEAN && nodoDer.type == Type.INT) {
                const val: number = nodoIzq.value ? 1 : 0
                result = {
                    value: (val + nodoDer.value),
                    type: Type.INT
                }
            }
            else if (nodoDer.type == Type.BOOLEAN && nodoIzq.type == Type.INT) {
                const val: number = nodoDer.value ? 1 : 0
                result = {
                    value: (val + nodoIzq.value),
                    type: Type.INT
                }
            }
            else if (nodoIzq.type == Type.BOOLEAN || nodoDer.type == Type.BOOLEAN) {
                const val1: number = nodoIzq.value ? 1 : 0
                const val2: number = nodoDer.value ? 1 : 0
                result = {
                    value: (val1 + val2),
                    type: Type.INT
                }
            }

            //demas validadionces para la operaciones aritmeticas

        } else if (this.type == AritmeticaOp.MENOS) {


            if (nodoDer.type == Type.INT && nodoIzq.type == Type.INT) {
                result = {
                    value: (nodoIzq.value - nodoDer.value),
                    type: Type.INT
                }
            }
            //en la resta unicamente quiero con numeros

        }


        return result
    }


}