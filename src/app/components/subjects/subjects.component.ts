import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { log } from '../../services/console.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    log('SubjectsComponent init', 'green');

    // Subject
    const btn1Click = fromEvent(document.querySelector('#btn1') , 'click').subscribe(_ => {

    });
    //  BehaviorSubject
    const btn2Click = fromEvent(document.querySelector('#btn2') , 'click').subscribe(_ => {

    });

    //  ReplaySubject
    const btn3Click = fromEvent(document.querySelector('#btn3') , 'click').subscribe(_ => {

    });
    //  AsyncSubject
    const btn4Click = fromEvent(document.querySelector('#btn4') , 'click').subscribe(_ => {

    });
  }

  ngOnDestroy(): void {
    log('SubjectsComponent destroy', 'red');
  }
}
