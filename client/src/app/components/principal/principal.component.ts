import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';//XD
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
  };
  
}
