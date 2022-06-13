import { Instruccion } from "../Abstracto/instruccion";

export class Declaracion extends Instruccion {
    constructor(
        public nombre: string,
        public tipo: string,
        line: number,//ESTA EN INSTUCCION
        column: number//ESTA EN INSTRUCCION
    ){
        super(line, column)
    }
    public ejecutar(){
        //ANALISIS SEMANTICO
        console.log("Declarando nueva variable: " + this.nombre);
        console.log(this);
    }
}