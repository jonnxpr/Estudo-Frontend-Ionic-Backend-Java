import { ViewPersonPage } from './../view-person/view-person';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  items: any;

  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams) {
    this.listar();
  }

  public listar() {
    let data = this.http.get('http://localhost:8080/persons');
    data.subscribe(result => {
      this.items = result;
      console.log(this.items);
    },
      reject => {
        console.log("Falha na obtenção dos dados!");
      });
  }

  public verPessoa(event, item) {
    this.navCtrl.push(ViewPersonPage, {
      item: item
    });
  }
}
