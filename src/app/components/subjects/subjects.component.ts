import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, fromEvent, ReplaySubject, Subject } from 'rxjs';
import { getColor } from '../../services/colors.service';
import { log } from '../../services/console.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, OnDestroy {
  subjectInput = '1';

  public sbjCounts = {
    subject: 0,
    behaviorSubject: 0,
    repleySubject: 0,
    asyncSubject: 0
  }
  constructor() { }

  ngOnInit(): void {
    log('SubjectsComponent init', 'green');

    // Subject
    const subject$$ = new Subject();
    const btn1Click = fromEvent(document.querySelector('#btn1') , 'click').subscribe(_ => {
      const i = this.sbjCounts.subject++;
      subject$$.subscribe(x => log(`Subject_${i}: ${x}`, getColor(i)))
    });

    //  BehaviorSubject
    const behaviorSubject$$ = new BehaviorSubject("инициализирующие значение");
    const btn2Click = fromEvent(document.querySelector('#btn2') , 'click').subscribe(_ => {
      const i = this.sbjCounts.behaviorSubject++;
      behaviorSubject$$.subscribe(x => log(`BehaviorSubject_${i}: ${x}`, getColor(i)))
    });

    //  ReplaySubject
    const replaySubject$$ = new ReplaySubject(3);
    const btn3Click = fromEvent(document.querySelector('#btn3') , 'click').subscribe(_ => {
      const i = this.sbjCounts.repleySubject++;
      replaySubject$$.subscribe(x => log(`ReplaySubject_${i}: ${x}`, getColor(i)))
    });
    //  AsyncSubject
    const asyncSubject$$ = new AsyncSubject();
    const btn4Click = fromEvent(document.querySelector('#btn4') , 'click').subscribe(_ => {
      const i = this.sbjCounts.asyncSubject++;
      asyncSubject$$.subscribe(x => log(`AsyncSubject_${i}: ${x}`, getColor(i)))
    });
    const btn5Click = fromEvent(document.querySelector('#btn5') , 'click').subscribe(_ => {
      asyncSubject$$.complete();
    });


    fromEvent(document.querySelector('#subj-add') , 'click').subscribe(_ => {
      
      subject$$.next(this.subjectInput);
      behaviorSubject$$.next(this.subjectInput);
      replaySubject$$.next(this.subjectInput);
      asyncSubject$$.next(this.subjectInput);
    });
  }

  ngOnDestroy(): void {
    log('SubjectsComponent destroy', 'red');
  }
}
