import { Router } from 'express';

class GetJison {
    public router: Router = Router()

    constructor() {//LLAMAR A LAS TURAS
        this.config()
    };
    //get obtener
    //set leer
    config(): void {
        this.router.post('/Express', function (req, res) {
            var jisonStr: String = req.body.jison;
            res.json({ mensaje: `flp obtenido ${jisonStr}` });
        });
    }
}
//IMPORTANTE ESTO SI NO NO SIRVE
const usuarioRuta = new GetJison();
export default usuarioRuta.router;