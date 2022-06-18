import {Router} from 'express'
//const {LiteralVar} = require('./EvaJisonExp/literalVar');
//import {tablaGSimbolos} from './Abstracto/tablaGeneral'
import { Environment } from './symbols/enviroment'
const parser = require('./Zjison/gramatica');
import {Singleton} from "./patron_singleton/singleton";
const singleton = Singleton.getInstance()

class Test{

  public router: Router= Router()

  constructor(){//LLAMAR A LAS TURAS
    this.config()
  };

  config(): void{
    var incrementando:number=0;
    this.router.get('/', (req, res) => res.json({ hola: 'wamos' }));
    this.router.get('/masmasExpress', function(req, res){
      incrementando++
      res.json({ mensaje: 'incrementando i' })
    });
    this.router.get('/GetIncrementoExpress', function (req, res) {//OBTIENE
      res.json({ resultado:incrementando })
    });
    //SUBIR
    this.router.post('/SetIncrementoExpress', function (req, res) {//URL TEST/SetIncrementoExpres
      incrementando=req.body.numero
      res.json({ mensaje:`incrementando ${incrementando}` })
      res.send('hola');
    });

    //OTENER TEXTAREA
    var txt: string ="let";
    this.router.post('/SetTxtAreaExpress', function (req, res) {//ENVIA
        txt = req.body.txtarea//->se lo envio desde usuario service/getTxtAreaService
        res.json({ mensaje: `E:vieneAngular<-------- ${txt}` })

        //INTENTO DE LEER LO QUE ENVIO
      console.log(`TXT ENVIADO ${txt}`)
        const ast=parser.parse(txt)
        const env_padre = new Environment(null);
          for(const elemento of ast){
            try {
              elemento.executar(env_padre)
              } catch (error) {
              singleton.add_errores(error)
          }
            console.log("Termine de recorrer el ast :) ahora mostrare lo que tiene el singleton consola")
            console.log("Consola del usuario:-----------------------------");
            console.log("Termine de recorrer el ast :) ahora mostrare lo que tiene el singleton consola")
            console.log("Consola del usuario:-----------------------------");

            console.log(singleton.get_consola());
      }

    });

    this.router.get('/GetTxtAreaSaludoExpress', function (req, res) {//ENVIA
      res.json({ mensaje: `E:reenviadoAngular--------> ${txt}` })
    });

  }

  test(): void{
  }
}
//IMPORTANTE ESTO SI NO NO SIRVE
const usuarioRuta = new Test();
export default usuarioRuta.router;