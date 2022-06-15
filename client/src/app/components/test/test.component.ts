//GET()
//SET(a)

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';//XD
import { txtArea } from 'src/modelos/txtArea'//MODELO QUE LE ENVIO
import { mensaje } from 'src/modelos/mensaje'//MODELO QUE LE ENVIO
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  txt: txtArea = {
    txtarea: '',
  };
  ms:any=[];
  constructor(private serviceU: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute){
    this.getSaludo();
  }
  ngOnInit(): void {
    
  };
  getSaludo(){
    /*const test:mensaje={mensaje:'asdf'};
    console.log(test)*/
    this.serviceU.getSaludoService().subscribe(
      res=>{
        this.ms=res;//LE ENVIO DESDE EXPRESS UNA RESPUESTA.mensaje 
        console.log(this.ms)
      },
      err => console.log(err),
    )
    //console.log(this.ms)->evia array=[]
  };

  getdatoComponente() {
    //UserService donde esta services/user.service
    this.serviceU.getdataService().subscribe(//->CARPETA SERVICE
      (res) => console.log(res),
      (err) => console.log(err),
    )
    
  };
  addTodo(title: string) {
    this.txt={
      txtarea: title,
    }
    //OBNTENGO TXTAREA
    this.serviceU.setTxtAreaService(this.txt).subscribe(//LE ENVIO OBJETO TIPO TXT{/componentes}
      (res) => {
        console.log('A:envioExpres---------------------------->')
        console.log(res)
      },
      (err) => console.log(err)
    )
    //RECIVO MENSAJE DESDE EXPRESS
    this.serviceU.getTxtAreaSaludoService().subscribe(//->CARPETA SERVICE
        res => {
          this.ms = res;//LE ENVIO DESDE EXPRESS UNA RESPUESTA.mensaje
          console.log('A:VieneExpress<----------------------------') 
          console.log(this.ms+'s')
        },
      (err) => console.log(err),
    )
    //Fuente: https://www.iteramos.com/pregunta/88077/obtener-la-entrada-del-usuario-de-textarea
  };

}
