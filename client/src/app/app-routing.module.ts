import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenubComponent } from './components/menub/menub.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/'//REDIRIJE A LA PAGINA PRINCIPAL
  },
  {
    path: 'randomT',//->URL QUE MUESTRA ANGULAR{componentes}
    component: TestComponent
  },
  {
    path:'principal',
    component: PrincipalComponent
  },{
    path: 'menuB',
    component: MenubComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
