import {Router} from 'express'
class Test{

  public router: Router= Router()

  constructor(){//LLAMAR A LAS TURAS
    this.config()
  };

  config(): void{
    var incrementando=0;
    this.router.get('/', (req, res) => res.json({ hola: 'wamos' }));
    this.router.get('/masmasExpress', function(req, res){
      incrementando++
      res.json({ mensaje: 'incrementando i' })
    });
    this.router.get('/GetIncrementoExpress', function (req, res) {
      res.json({ resultado:incrementando })
    });
    this.router.post('/SetIncrementoExpress', function (req, res) {
      incrementando=req.body.numero
      res.json({ mensaje:`incrementando ${incrementando}` })
      res.send('hola');
    });

    //SUBIR
    this.router.post('/subir',function (req, res) {
      
    });
  }
}
//IMPORTANTE ESTO SI NO NO SIRVE
const usuarioRuta = new Test();
export default usuarioRuta.router;