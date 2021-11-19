import { ListPage } from './../list/list';
import { MenuPage } from './../menu/menu';
import { Person } from './../../app/app.component';
import { ViewPersonPage } from './../view-person/view-person';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { App, MenuController, NavController, ToastController } from 'ionic-angular';
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends HttpServiceProvider {
  todo: FormGroup;
  items: any;
  person: Person;
  delete_update_Person: any;
  nomeTeste: any;
  validation_messages = {
    'myField': [
      { type: 'pattern', message: 'Please enter a number like 12345678/00.' }
    ]
  }

  constructor(app: App, menu: MenuController, public navCtrl: NavController, public http: HttpClient, private formBuilder: FormBuilder, public toastCtrl: ToastController) {
    super(http);
    menu.enable(true);
    this.todo = this.formBuilder.group({
      nome: ['', [Validators.minLength(5), Validators.required]],
      cpf: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      idade: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      descricao: ['', [Validators.required]],
    });

    this.listar();
  }

  public presentToast() {
    const toastSucesso = this.toastCtrl.create({
      message: 'Usuário adicionado com sucesso!',
      duration: 3000
    });
    const toastFalha = this.toastCtrl.create({
      message: 'Não foi possível adicionar o usuário desejado!',
      duration: 3000
    });

    if (this.todo.valid) {
      toastSucesso.present();
    } else {
      toastFalha.present();
    }

  }

  public salvar() {
    if (this.todo.valid) {
      const person = this.todo.getRawValue() as Person;
      let data = this.http.post('http://localhost:8080/persons', person);
      data.subscribe(result => {
        console.log("Inserção realizada com sucesso!");
        //this.navCtrl.push(HomePage);
      },
        reject => {
          console.log("Erro na inserção!");
        });
      //alert(JSON.stringify(person, null, 4));
    }
  }

  public listar() {
    let data = this.http.get('http://localhost:8080/persons');
    data.subscribe(result => {
      this.items = result;
    },
      reject => {
        console.log("Falha na obtenção dos dados!");
      });
  }

  public deletarTudo() {
    let response = this.http.delete('http://localhost:8080/persons/delete');
    response.subscribe(result => {
      console.log("Dados excluídos com sucesso!");
      //this.navCtrl.push(HomePage);
    }, reject => {
      console.log("Falha na exclusão dos dados!");
    });
  }

  public limparForm() {
    this.todo.reset();
  }

  public carregarDados() {
    this.todo.get("nome").setValue(this.delete_update_Person["nome"]);
    this.todo.get("idade").setValue(this.delete_update_Person["idade"]);
    this.todo.get("cpf").setValue(this.delete_update_Person["cpf"]);
    this.todo.get("rg").setValue(this.delete_update_Person["rg"]);
    this.todo.get("descricao").setValue(this.delete_update_Person["descricao"]);
  }

  public atualizar() {
    const person = this.todo.getRawValue() as Person;
    let data = this.http.put('http://localhost:8080/persons/' + this.delete_update_Person['id'], person);
    data.subscribe(result => {
      console.log("Atualização realizada com sucesso!");
      //this.navCtrl.push(HomePage);
    },
      reject => {
        console.log("Erro na atualização!");
      });
  }

  public deletar() {
    console.log('http://localhost:8080/persons/' + this.delete_update_Person["id"]);
    let response = this.http.delete('http://localhost:8080/persons/' + this.delete_update_Person["id"]);

    response.subscribe(result => {
      console.log("Dados excluídos com sucesso!");
      //this.navCtrl.push(HomePage);
    }, reject => {
      console.log("Falha na exclusão dos dados!");
    });
  }

  public portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
    this.delete_update_Person = event.value;
    this.carregarDados();
  }

  public mostrarPaginaListagem() {
    this.navCtrl.push(ListPage)
  }

  public ionViewWillEnter() {
    this.listar();
    console.log("testeViewEnter");
  }
}

