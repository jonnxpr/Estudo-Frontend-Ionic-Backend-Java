import { TesteDePaginaPage } from './../teste-de-pagina/teste-de-pagina';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { NgModel } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends HttpServiceProvider {
  varCPF: string = "";

  constructor(public navCtrl: NavController, public http: HttpClient) {
    super(http);
    //this.getAll();
  }

  mudarPagina() {
    this.navCtrl.push(TesteDePaginaPage, {
      id: "123",
      name: "Carl"
    });
  }

  logar() {
    let data = this.http.get('http://localhost:8080/hello/login/' + this.varCPF);
    data.subscribe(result => {
      this.items = result;
      console.log(this.items);
    },
      reject => {
        alert("escreve ai arrombado!");
      });
  }
}
