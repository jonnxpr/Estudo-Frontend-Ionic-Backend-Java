import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TesteDePaginaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teste-de-pagina',
  templateUrl: 'teste-de-pagina.html',
})
export class TesteDePaginaPage {
  private id: number
  private name: string

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');
    this.name = navParams.get('name');
  }

  ionViewDidLoad() {
    console.log(this.name + " " + this.id);
  }


}
