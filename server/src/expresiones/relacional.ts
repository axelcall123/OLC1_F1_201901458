import { Expression } from "../abstract/express";
import { Retorno } from "../abstract/Retorno";
import { Environment } from "../symbols/enviroment";
import { Type } from "../symbols/type";
import { RelacionalOption } from "./relacionalOption";

export class Relacional extends Expression {
  constructor(
    private left: Expression,
    private right: Expression,
    private type: RelacionalOption,
    line: number,
    column: number
  ) {
    super(line, column);
  }

  public executar(env: Environment): Retorno {
    let result: Retorno = {
      value: null,
      type: Type.error,
    };

    const nodoIzq = this.left.executar(env);
    const nodoDer = this.right.executar(env);

    if (this.type == RelacionalOption.MAYOR) {
      if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.NUMBER) {
        result = {
          value: nodoIzq.value > nodoDer.value,
          type: Type.BOOLEAN,
        };
      }
    }else if (this.type == RelacionalOption.MENOR) {
        if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.NUMBER) {
          result = {
            value: nodoIzq.value < nodoDer.value,
            type: Type.BOOLEAN,
          };
        }
      }
    
    return result;
  }
}
