import { ConnectableObservable, from, fromEvent, interval, Subject, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { log } from '../../services/console.service';
import { multicast, refCount, tap } from 'rxjs/operators';
import { getColor } from 'src/app/services/colors.service';

@Component({
  selector: 'app-connectable',
  templateUrl: './connectable.component.html',
  styleUrls: ['./connectable.component.css']
})
export class ConnectableComponent implements OnInit, OnDestroy {

  counter = {
    mult: 0,
    ref: 0,

  }
  constructor() { }

  ngOnInit(): void {
    log('ConnectableComponent init', 'green');


    const infityColdObs$ = interval(1000).pipe(tap(x => log('source obs:' + x)));

    //  -- Multicasted Observable --  //
    const multicasted$ = infityColdObs$.pipe(multicast(() => new Subject())) as ConnectableObservable<any>;
    let connectableSub: Subscription;
    let multicastedSub: Subscription;

    fromEvent(document.querySelector('#btn1') , 'click').subscribe(_ => {
      const i = this.counter.mult++;   
      connectableSub = multicasted$.subscribe(x => log(`multicasted obs_${i}: ${x}`, getColor(i)));
    });
    fromEvent(document.querySelector('#btn1-connect') , 'click').subscribe(_ => {
      multicastedSub = multicasted$.connect();
    });
    fromEvent(document.querySelector('#btn1-close') , 'click').subscribe(_ => {
      connectableSub.unsubscribe(); // отписка от потока
      //multicastedSub.unsubscribe(); // отписка от мультикаста
    });

    // refCount
    const refCount$ = infityColdObs$.pipe(multicast(() => new Subject()), refCount()) as ConnectableObservable<any>;
    let refSub: Subscription; 
    fromEvent(document.querySelector('#btn2') , 'click').subscribe(_ => {
      const i = this.counter.ref++;   
      refSub = refCount$.subscribe(x => log(`refCount obs_${i}: ${x}`, getColor(i)));
    });
    fromEvent(document.querySelector('#btn2-close') , 'click').subscribe(_ => {
      refSub.unsubscribe();
    });
  }
  ngOnDestroy(): void {
    log('ConnectableComponent destroy', 'red');
  }
}
