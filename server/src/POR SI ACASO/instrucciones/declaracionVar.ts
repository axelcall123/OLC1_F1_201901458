import { Expresion } from "../Abstracto/expresion";
import { Instruccion } from "../Abstracto/instruccion";
import { tablaGSimbolos } from "../Abstracto/tablaGeneral"

export class Declaracion extends Instruccion {
    constructor(
        public nombre: string,
        public tipo: string,
        public expresion:Expresion,
        line: number,//ESTA EN INSTUCCION
        column: number//ESTA EN INSTRUCCION
    ){
        super(line, column)
    }
    public ejecutar(tabla: tablaGSimbolos){
        //ANALISIS SEMANTICO
        console.log("Declarando nueva variable: " + this.nombre);
        const expresion=this.expresion.ejecutar(tabla);
        console.log(expresion);
        tabla.guardar_variable(this.nombre,expresion.value,expresion.type);
    }
}