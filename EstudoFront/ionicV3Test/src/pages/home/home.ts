import { TesteDePaginaPage } from './../teste-de-pagina/teste-de-pagina';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { HttpServiceProvider } from "../../providers/http-service/http-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends HttpServiceProvider {

  constructor(public navCtrl: NavController, public http: HttpClient) {
    super(http);
    this.getAll();
  }

  mudarPagina() {
    this.navCtrl.push(TesteDePaginaPage, {
      id: "123",
      name: "Carl"
    });
  }
}
