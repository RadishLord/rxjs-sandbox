import { Component, OnDestroy, OnInit } from '@angular/core';
import { log } from '../../services/console.service';

@Component({
  selector: 'app-combine',
  templateUrl: './combine.component.html',
  styleUrls: ['./combine.component.css']
})
export class CombineComponent implements  OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    log('CombineComponent destroy', 'red');
  }
}
