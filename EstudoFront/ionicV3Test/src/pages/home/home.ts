import { TesteDePaginaPage } from './../teste-de-pagina/teste-de-pagina';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { NgModel } from '@angular/forms';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends HttpServiceProvider {
  varCPF: string = "";
  private todo: FormGroup;

  constructor(public navCtrl: NavController, public http: HttpClient, private formBuilder: FormBuilder) {
    super(http);
    this.todo = this.formBuilder.group({
      nome: [''],
      cpf: [''],
      rg: [''],
      idade: [''],
    });
    //this.getAll();
    //this.getData();
  }

  /*mudarPagina() {
    this.navCtrl.push(TesteDePaginaPage, {
      id: "123",
      name: "Carl"
    });
  }*/

  getData() {
    let data = this.http.get('http://localhost:8080/persons');
    data.subscribe(result => {
      this.items = result;
      console.log(this.items);
    },
      reject => {
        console.log("Deu ruim!");
        alert("escreve ai!");
      });
  }

  salvar() {
    const person = this.todo.getRawValue() as Person;
    let data = this.http.post('http://localhost:8080/persons', person);
    alert(JSON.stringify(person, null, 4));
  }

  limparForm() {
    this.todo.reset();
  }
}

class Person {
  nome: string;
  cpf: string;
  rg: string;
  idade: number;
}
