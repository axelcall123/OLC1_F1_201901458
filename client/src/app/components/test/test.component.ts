import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';//XD
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
  };
  getSaludo(){
    this.service.getSaludoService().subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  };
  getdatoComponente() {
    //UserService donde esta services/user.service
    this.service.getdataService().subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  };
  addTodo(title: string) {
    console.log(title);
    //Fuente: https://www.iteramos.com/pregunta/88077/obtener-la-entrada-del-usuario-de-textarea
  };

}
