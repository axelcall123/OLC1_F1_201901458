import { Symbol } from "./simbolos";
import { Type } from "../Tipos/typeOp";

export class tablaGSimbolos {

    private tablaSimbolos: Map<string, Symbol>; //unicamente para variables, tienes q guardar funciones en otro map 
    //TABLA DE VARAIBLES
    constructor(public anterior: tablaGSimbolos | null) {
        this.tablaSimbolos = new Map();
    }

    public getEnv() {
        return this.tablaSimbolos
    }

    public guardar_variable(nombre: string, valor: any, type: Type): boolean {

        if (!this.buscar_variable(nombre)) {
            //FIMXE:
            this.tablaSimbolos.set(nombre, new Symbol(valor, nombre, type,false));
            return true
        }
        console.log("esta variable [" + nombre + "] ya existe...");
        return false
    }

    public buscar_variable(nombre: string): boolean {
        for (let entry of Array.from(this.tablaSimbolos.entries())) {
            if (entry[0] == nombre) return true;
        }
        return false
    }
    public getTipo_variable(nombre: string): Type {
        for (let entry of Array.from(this.tablaSimbolos.entries())) {
            if (entry[0] == nombre) return entry[1].type;
        }
        return Type.E
    }
    public actualizar_variable(nombre: string, new_valor: any) {
        for (let entry of Array.from(this.tablaSimbolos.entries())) {
            if (entry[0] == nombre) {
                entry[1].value = new_valor;
            }
        }
    }

}