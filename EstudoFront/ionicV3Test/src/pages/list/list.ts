import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  private listar() {
    let data = this.http.get('http://localhost:8080/persons');
    data.subscribe(result => {
      this.items = result;
    },
      reject => {
        console.log("Falha na obtenção dos dados!");
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
