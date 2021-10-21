import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TesteDePaginaPage } from './teste-de-pagina';

@NgModule({
  declarations: [
    TesteDePaginaPage,
  ],
  imports: [
    IonicPageModule.forChild(TesteDePaginaPage),
  ],
})
export class TesteDePaginaPageModule { }
