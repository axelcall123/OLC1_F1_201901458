"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incremento = void 0;
function incremento(str) {
    debugger;
    const array = str.split("");
    if (array[0] == '+') { //AUMENTO ++5
        str = str.replace("++", "");
        str = (Number(str) + 1).toString();
    }
    else if (array[0] == "-") { //DISMINUYE --5
        str = str.replace("--", "");
        str = (Number(str) - 1).toString();
    }
    else if (array[array.length - 1] == '+') { //AUMENTO 5++
        str = str.replace("++", "");
        //console.log(`->${str}`);
        str = (Number(str) + 1).toString();
    }
    else if (array[array.length - 1] == "-") { //DIMINUYE 5--
        str = str.replace("--", "");
        str = (Number(str) - 1).toString();
    }
    return str;
}
exports.incremento = incremento;
