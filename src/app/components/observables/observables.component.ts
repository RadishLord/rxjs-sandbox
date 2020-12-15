import { Component, OnDestroy, OnInit } from '@angular/core';
import { log } from '../../services/console.service';


@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styles: [
  ]
})
export class ObservablesComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    log('ObservablesComponent init', 'green');
  }
  ngOnDestroy(): void {
    log('ObservablesComponent destroy', 'red');
  }

}
