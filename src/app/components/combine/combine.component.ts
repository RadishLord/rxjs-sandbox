import { Component, OnDestroy, OnInit } from '@angular/core';
import { getGroup, watch } from 'rxjs-watcher';
import { Subject, Observable, fromEvent, scheduled, queueScheduler, race, merge, concat, combineLatest, zip, forkJoin } from 'rxjs';
import { concatAll, map, mergeAll, switchAll, takeUntil, withLatestFrom } from 'rxjs/operators';
import { log } from '../../services/console.service';

@Component({
  selector: 'app-combine',
  templateUrl: './combine.component.html',
  styleUrls: ['./combine.component.css']
})
export class CombineComponent implements  OnInit, OnDestroy {
  protected destroyed = new Subject();
  constructor() { }

  ngOnInit(): void {
    log('ObservablesComponent init', 'green');

    //  --  Megre --  //
    const mergeWatch = getGroup("Merge");
    let mergeA$ = new Observable(observer => {
      observer.next('1-a');
      setTimeout(_ => observer.next('2-a'), 500);
      setTimeout(_ => observer.next('3-a'), 1500);
      setTimeout(_ => observer.complete(), 2000);
    }).pipe(mergeWatch('A$'));
    let mergeB$ = new Observable(observer => {
      observer.next('1-b');
      setTimeout(_ => observer.next('2-b'), 1000);
      setTimeout(_ => observer.next('3-b'), 2000);
      setTimeout(_ => observer.next('4-b'), 2500);
      setTimeout(_ => observer.complete(), 2600);
    }).pipe(mergeWatch('B$'));
    fromEvent(document.querySelector('#btn1') , 'click').pipe(takeUntil(this.destroyed)).subscribe(_ => {
        //const mergeSub = scheduled([mergeA$, mergeB$], queueScheduler).pipe(mergeAll(), mergeWatch('mergeAB$')).subscribe(x => log('merge: ' + x, 'blue'));
        const mergeSub = merge(mergeA$, mergeB$).pipe(mergeWatch('mergeAB$')).subscribe(x => log('merge: ' + x, 'blue'));
    });

    //  --  Concat --  //
    const concatWatch = getGroup("Concat");
    let concatA$ = new Observable(observer => {
      observer.next('1-a');
      setTimeout(_ => observer.next('2-a'), 500);
      setTimeout(_ => observer.next('3-a'), 1500);
      setTimeout(_ => observer.complete(), 2500);
    }).pipe(concatWatch('A$'));
    let concatB$ = new Observable(observer => {
      observer.next('1-b');
      setTimeout(_ => observer.next('2-b'), 1000);
      setTimeout(_ => observer.next('3-b'), 2000);
      setTimeout(_ => observer.next('4-b'), 3000);
      setTimeout(_ => observer.next('5-b'), 3500);
      setTimeout(_ => observer.complete(), 4000);
    }).pipe(concatWatch('A$'));
    fromEvent(document.querySelector('#btn2') , 'click').pipe(takeUntil(this.destroyed)).subscribe(_ => {
      const concatSub = concat(concatA$, concatB$).pipe(concatWatch('concatAB$')).subscribe(x => log('concat: ' + x, 'green'));
    });

    //  --  Race --  //
    const raceWatch = getGroup("Race");
    let raceA$ = new Observable(observer => {
      observer.next('1-a');
      setTimeout(_ => observer.next('2-a'), 500);
      setTimeout(_ => observer.next('3-a'), 1500);
      setTimeout(_ => observer.complete(), 2500);
    }).pipe(raceWatch('A$'));
    let raceB$ = new Observable(observer => {
      observer.next('1-b');
      setTimeout(_ => observer.next('2-b'), 1000);
      setTimeout(_ => observer.next('3-b'), 2000);
      setTimeout(_ => observer.next('4-b'), 3000);
      setTimeout(_ => observer.next('5-b'), 3500);
      setTimeout(_ => observer.complete(), 4000);
    }).pipe(raceWatch('B$'));     
    fromEvent(document.querySelector('#btn3') , 'click').pipe(takeUntil(this.destroyed)).subscribe(_ => {
      const raceSub = race(raceA$, raceB$).pipe(raceWatch('raceAB')).subscribe(x => log('concat: ' + x, 'orange'));
    });

    //  --  MergeAll --  //
    const mergeAllWatch = getGroup("MergeAll");
    let mergeAllA$ = new Observable(observer => {
      observer.next('1-a');
      setTimeout(_ => observer.next('2-a'), 500);
      setTimeout(_ => observer.next('3-a'), 1500);
      setTimeout(_ => observer.complete(), 2000);
    }).pipe(mergeAllWatch('A$'));
    let mergeAllB$ = new Observable(observer => {
      observer.next('1-b');
      setTimeout(_ => observer.next('2-b'), 1000);
      setTimeout(_ => observer.next('3-b'), 2000);
      setTimeout(_ => observer.next('4-b'), 2500);
      setTimeout(_ => observer.complete(), 2600);
    }).pipe(mergeAllWatch('B$'));
    fromEvent(document.querySelector('#btn4') , 'click').pipe(takeUntil(this.destroyed)).subscribe(_ => {
      //todo
        const mergeAllSub = scheduled([mergeAllA$, mergeAllB$], queueScheduler).pipe(mergeAll(), mergeAllWatch('mergeAllAB$')).subscribe(x => log('mergeAll: ' + x, 'blue'));
    });

    //  --  ConcatAll --  //
    const concatAllWatch = getGroup("ConcatAll");
    let concatAllA$ = new Observable(observer => {
      observer.next('1-a');
      setTimeout(_ => observer.next('2-a'), 500);
      setTimeout(_ => observer.next('3-a'), 1500);
      setTimeout(_ => observer.complete(), 2500);
    }).pipe(concatAllWatch('A$'));
    let concatAllB$ = new Observable(observer => {
      observer.next('1-b');
      setTimeout(_ => observer.next('2-b'), 1000);
      setTimeout(_ => observer.next('3-b'), 2000);
      setTimeout(_ => observer.next('4-b'), 3000);
      setTimeout(_ => observer.next('5-b'), 3500);
      setTimeout(_ => observer.complete(), 4000);
    }).pipe(concatAllWatch('A$'));
    fromEvent(document.querySelector('#btn5') , 'click').pipe(takeUntil(this.destroyed)).subscribe(_ => {
      const concatSub = scheduled([concatAllA$, concatAllB$], queueScheduler).pipe(concatAll(), concatAllWatch('concatAllAB$')).subscribe(x => log('concatAll: ' + x, 'green'));
    });

    //  --  SwitchAll --  //
    const switchAllWatch = getGroup("switchAll");
    let switchAllA$ = new Observable(observer => {
      observer.next('1-a');
      setTimeout(_ => observer.next('2-a'), 500);
      setTimeout(_ => observer.next('3-a'), 1500);
      setTimeout(_ => observer.complete(), 2500);
    }).pipe(switchAllWatch('A$'));
    let switchAllB$ = new Observable(observer => {
      observer.next('1-b');
      setTimeout(_ => observer.next('2-b'), 1000);
      setTimeout(_ => observer.next('3-b'), 2000);
      setTimeout(_ => observer.next('4-b'), 3000);
      setTimeout(_ => observer.next('5-b'), 3500);
      setTimeout(_ => observer.complete(), 4000);
    }).pipe(switchAllWatch('A$'));
    fromEvent(document.querySelector('#btn6') , 'click').pipe(takeUntil(this.destroyed)).subscribe(_ => {
      //const switchSub = scheduled([switchAllA$, switchAllB$], queueScheduler).pipe(switchAll(), switchAllWatch('switchAllAB$')).subscribe(x => log('switchAll: ' + x, 'pink'));
      const switchSub = switchAllA$.pipe(map(x => switchAllB$), switchAll(), switchAllWatch('switchAllAB$')).subscribe(x => log('switchAll: ' + x, 'pink'));
    });

    //  --  CombineLatest --  //
    const combineLatestWatch = getGroup("combineLatest");
    let combineLatestA$ = new Observable(observer => {
      observer.next('1-a');
      setTimeout(_ => observer.next('2-a'), 500);
      setTimeout(_ => observer.next('3-a'), 1500);
      setTimeout(_ => observer.complete(), 2500);
    }).pipe(combineLatestWatch('A$'));
    let combineLatestB$ = new Observable(observer => {
      observer.next('1-b');
      setTimeout(_ => observer.next('2-b'), 1000);
      setTimeout(_ => observer.next('3-b'), 2000);
      setTimeout(_ => observer.next('4-b'), 3000);
      setTimeout(_ => observer.next('5-b'), 3500);
      setTimeout(_ => observer.complete(), 4000);
    }).pipe(combineLatestWatch('A$'));
    fromEvent(document.querySelector('#btn7') , 'click').pipe(takeUntil(this.destroyed)).subscribe(_ => {
      const combineLatestSub = combineLatest([combineLatestA$, combineLatestB$]).pipe(
        map(x => `${x[0]} + ${x[1]}`), 
        combineLatestWatch('combineLatestAB$')
      ).subscribe(x => log('combineLatestAB: ' + x, 'brown'));
    });

    //  --  Zip --  //
    const zipWatch = getGroup("zip");
    let zipA$ = new Observable(observer => {
      observer.next('1-a');
      setTimeout(_ => observer.next('2-a'), 500);
      setTimeout(_ => observer.next('3-a'), 1500);
      setTimeout(_ => observer.complete(), 2500);
    }).pipe(zipWatch('A$'));
    let zipB$ = new Observable(observer => {
      observer.next('1-b');
      setTimeout(_ => observer.next('2-b'), 1000);
      setTimeout(_ => observer.next('3-b'), 2000);
      setTimeout(_ => observer.next('4-b'), 3000);
      setTimeout(_ => observer.next('5-b'), 3500);
      setTimeout(_ => observer.complete(), 4000);
    }).pipe(zipWatch('A$'));
    fromEvent(document.querySelector('#btn8') , 'click').pipe(takeUntil(this.destroyed)).subscribe(_ => {
      const zipSub = zip(zipA$, zipB$).pipe(
        zipWatch('zipAB$')
      ).subscribe(x => log('zipAB: ' + x, 'purple'));
    });

    //  --  forkJoin --  //
    const forkJoinWatch = getGroup("forkJoin");
    let forkJoinA$ = new Observable(observer => {
      observer.next('1-a');
      setTimeout(_ => observer.next('2-a'), 500);
      setTimeout(_ => observer.next('3-a'), 1500);
      setTimeout(_ => observer.complete(), 2500);
    }).pipe(forkJoinWatch('A$'));
    let forkJoinB$ = new Observable(observer => {
      observer.next('1-b');
      setTimeout(_ => observer.next('2-b'), 1000);
      setTimeout(_ => observer.next('3-b'), 2000);
      setTimeout(_ => observer.next('4-b'), 3000);
      setTimeout(_ => observer.next('5-b'), 3500);
      setTimeout(_ => observer.complete(), 4000);
    }).pipe(forkJoinWatch('A$'));
    fromEvent(document.querySelector('#btn9') , 'click').pipe(takeUntil(this.destroyed)).subscribe(_ => {
      const forkJoinSub = forkJoin([forkJoinA$, forkJoinB$]).pipe(
        forkJoinWatch('forkJoinAB$')
      ).subscribe(x => log('forkJoinAB: ' + x, 'blue'));
    });

    //  --  withLatestFrom --  //
    const withLatestFromWatch = getGroup("withLatestFrom");
    let withLatestFromA$ = new Observable(observer => {
      observer.next('1-a');
      setTimeout(_ => observer.next('2-a'), 500);
      setTimeout(_ => observer.next('3-a'), 1500);
      setTimeout(_ => observer.complete(), 2500);
    }).pipe(withLatestFromWatch('A$'));
    let withLatestFromB$ = new Observable(observer => {
      observer.next('1-b');
      setTimeout(_ => observer.next('2-b'), 1000);
      setTimeout(_ => observer.next('3-b'), 2000);
      setTimeout(_ => observer.next('4-b'), 3000);
      setTimeout(_ => observer.next('5-b'), 3500);
      setTimeout(_ => observer.complete(), 4000);
    }).pipe(withLatestFromWatch('A$'));
    fromEvent(document.querySelector('#btn10') , 'click').pipe(takeUntil(this.destroyed)).subscribe(_ => {
      const withLatestFromSub = withLatestFromA$.pipe(
        withLatestFrom(withLatestFromB$),
        withLatestFromWatch('withLatestFromWatchAB$')
      ).subscribe(x => log('withLatestFromWatchAB: ' + x, 'green'));
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
    log('CombineComponent destroy', 'red');
  }
}
