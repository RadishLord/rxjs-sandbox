import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatListModule} from '@angular/material/list';
import { ObservablesComponent } from './components/observables/observables.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ConnectableComponent } from './components/connectable/connectable.component';
import { CombineComponent } from './components/combine/combine.component'

@NgModule({
  declarations: [
    AppComponent,
    ObservablesComponent,
    SubjectsComponent,
    ConnectableComponent,
    CombineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
