import { Person } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewPersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-person',
  templateUrl: 'view-person.html',
})
export class ViewPersonPage {
  value: any = {
    "item": "", //Value of merchantID should come here which I get from NavParams
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.value = navParams.get('item') as Person;
  }
}
