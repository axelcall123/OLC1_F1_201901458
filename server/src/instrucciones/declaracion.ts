import { Instruccion } from "../Abstracto/instruccion";

export class Declaracion extends Instruccion {
    constructor(
        public nombre: string,
        public tipo: string,
        public line: number,
        public column: number
    ){
        super(line, column)
    }
    public ejecutar(){
        //ANALISIS SEMANTICO
    }
}