import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {AppComponent} from './app';
import {AppRoutingModule,routes,navigatableComponents} from './app-routing.module';
import { RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';
import {AngularDraggableModule} from 'angular2-draggable';


@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularDraggableModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
