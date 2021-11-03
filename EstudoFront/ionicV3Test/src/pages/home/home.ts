import { Person } from './../../app/app.component';
import { ViewPersonPage } from './../view-person/view-person';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { App, MenuController, NavController, ToastController } from 'ionic-angular';
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends HttpServiceProvider {
  private todo: FormGroup;
  items: any;
  person: Person;
  delete_update_Person: any;
  nomeTeste: any;

  constructor(app: App, menu: MenuController, public navCtrl: NavController, public http: HttpClient, private formBuilder: FormBuilder, public toastCtrl: ToastController) {
    super(http);
    menu.enable(true);
    this.todo = this.formBuilder.group({
      nome: [''],
      cpf: [''],
      rg: [''],
      idade: [''],
      descricao: [''],
    });

    this.listar();
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
      this.navCtrl.push(HomePage);
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

  carregarDados() {
    this.todo.get("nome").setValue(this.delete_update_Person["nome"]);
    this.todo.get("idade").setValue(this.delete_update_Person["idade"]);
    this.todo.get("cpf").setValue(this.delete_update_Person["cpf"]);
    this.todo.get("rg").setValue(this.delete_update_Person["rg"]);
    this.todo.get("descricao").setValue(this.delete_update_Person["descricao"]);
  }

  atualizar() {
    const person = this.todo.getRawValue() as Person;
    let data = this.http.put('http://localhost:8080/persons/' + this.delete_update_Person['id'], person);
    data.subscribe(result => {
      console.log("Atualização realizada com sucesso!");
    },
      reject => {
        console.log("Erro na atualização!");
      });
  }

  deletar() {
    console.log('http://localhost:8080/persons/' + this.delete_update_Person["id"]);
    let response = this.http.delete('http://localhost:8080/persons/' + this.delete_update_Person["id"]);

    response.subscribe(result => {
      console.log("Dados excluídos com sucesso!");
      this.navCtrl.push(HomePage);
    }, reject => {
      console.log("Falha na exclusão dos dados!");
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
    this.delete_update_Person = event.value;
    this.carregarDados();
  }
}

