import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpServiceProvider {
  public items: any;
  public infoLogin: any;

  constructor(public http: HttpClient) {
  }

  getAll() {
    let data: Observable<any>;
    //data = this.http.get('https://jsonplaceholder.typicode.com/users/1/posts');
    data = this.http.get('http://localhost:8080/hello/create/jonathan&07310124618&26');
    console.log(data);

    data.subscribe(result => {
      console.log(result);
      this.items = result;
    });
  }

  async getItem(id: number) {
    alert(id);
  }
}
