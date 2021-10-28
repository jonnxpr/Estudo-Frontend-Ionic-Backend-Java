import { Person } from './../../app/app.component';
import { ViewPersonPage } from './../view-person/view-person';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends HttpServiceProvider {
  private todo: FormGroup;
  items: any;
  itemFilter: string[];

  constructor(public navCtrl: NavController, public http: HttpClient, private formBuilder: FormBuilder, public toastCtrl: ToastController) {
    super(http);
    this.todo = this.formBuilder.group({
      nome: [''],
      cpf: [''],
      rg: [''],
      idade: [''],
      descricao: [''],
    });

    //this.listar();
    this.initializeItems();

  }

  private presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Usuário adicionado com sucesso!',
      duration: 3000
    });
    toast.present();
  }

  private salvar() {
    const person = this.todo.getRawValue() as Person;
    let data = this.http.post('http://localhost:8080/persons', person);
    data.subscribe(result => {
      console.log("Inserção realizada com sucesso!");
    },
      reject => {
        console.log("Erro na inserção!");
      });
    //alert(JSON.stringify(person, null, 4));
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

  private deletarTudo() {
    let response = this.http.delete('http://localhost:8080/persons/delete');
    response.subscribe(result => {
      console.log("Dados excluídos com sucesso!");
    }, reject => {
      console.log("Falha na exclusão dos dados!");
    });
  }

  private limparForm() {
    this.todo.reset();
  }

  public verPessoa(event, item) {
    this.navCtrl.push(ViewPersonPage, {
      item: item
    });
  }

  atualizar() {

  }

  deletar() {

  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  initializeItems() {
    let data = this.http.get('http://localhost:8080/persons');
    data.subscribe(result => {
      this.items = result;
      this.itemFilter = new Array();
      this.items.forEach(element => {
        this.itemFilter.push(element["nome"]);
      });
    });
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the ev target
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.itemFilter = this.itemFilter.filter((item: any) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}

