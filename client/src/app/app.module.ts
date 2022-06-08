import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';//MODIFICADO
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { TestComponent } from './components/test/test.component';
import { MenubComponent } from './components/menub/menub.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    TestComponent,
    MenubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule//MODIFICADO
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
