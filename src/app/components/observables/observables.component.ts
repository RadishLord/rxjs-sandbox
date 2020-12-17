import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable, of, Subscriber, Subscription, zip } from 'rxjs';
import { delay, share, take } from 'rxjs/operators';
import { getColor } from '../../services/colors.service';
import { log } from '../../services/console.service';


@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styles: [
  ]
})
export class ObservablesComponent implements OnInit, OnDestroy {
  protected infinitySub: Subscription;
  protected finitSub: Subscription;
  protected infinityCount: number = 0;
  protected finitCount: number = 0;

  protected infinityHotSub: Subscription;
  protected finitHotSub: Subscription;
  protected infinityHotCount: number = 0;
  protected finitHotCount: number = 0;
  
  constructor() { }

  ngOnInit(): void {
    log('ObservablesComponent init', 'green');

    //  --  Холодные observable --  //
    //бесконечный observable
    const infinityObs$ = interval(1000).pipe();
    // подписываемся на бесконечный observable
    const btn1Click = fromEvent(document.querySelector('#btn1') , 'click').subscribe(_ => {
      const i = this.infinityCount++;
      this.infinitySub = infinityObs$.subscribe(x => log(`infinityColdObs$: ${x}`, getColor(i)))

    });
    // отписываемся 
    const btn2Click = fromEvent(document.querySelector('#btn2') , 'click').subscribe(_ => {
      if (this.infinitySub && typeof this.infinitySub.unsubscribe === "function"){
        this.infinitySub.unsubscribe();
        log('this.infinityColdSub  was unsubscribed', 'crimson');
      }
        

    });


    //конечный observable
    const finitColdObs$ = zip(of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9), interval(1000).pipe(take(10)));
    // const finitColdObs$ = new Observable<number>((subscriber) => {
    //   subscriber.next(1);
    //   subscriber.next(2);
    //   subscriber.next(3);
    //   setTimeout(_ => subscriber.next(4), 1000);
    //   setTimeout(_ => subscriber.next(5), 2000);
    //   setTimeout(_ => subscriber.next(6), 3000);
    //   setTimeout(_ => subscriber.next(7), 4000);
    // });
    // подписываемся на конечный observable
    const btn3Click = fromEvent(document.querySelector('#btn3') , 'click').subscribe(_ => {
      const i = this.finitCount++;
      this.finitSub = finitColdObs$.subscribe(x => log(`finitColdObs$: ${x}`, getColor(i)))
    });
    // отписываемся 
    const btn4Click = fromEvent(document.querySelector('#btn4') , 'click').subscribe(_ => {
      if (this.finitSub && typeof this.finitSub.unsubscribe === "function"){
        this.finitSub.unsubscribe();
        log('this.finitColdSub  was unsubscribed', 'crimson');
      }
        
    });


    //  --  Горячие observable --  //
    //бесконечный observable
    const infinityHotObs$ = interval(1000).pipe(share());
    // подписываемся на бесконечный observable
    const btn5Click = fromEvent(document.querySelector('#btn5') , 'click').subscribe(_ => {
      const i = this.infinityHotCount++;
      this.infinityHotSub = infinityHotObs$.subscribe(x => log(`infinityHotObs$: ${x}`, getColor(i)))

    });
    // отписываемся 
    const btn6Click = fromEvent(document.querySelector('#btn6') , 'click').subscribe(_ => {
      if (this.infinityHotSub && typeof this.infinityHotSub.unsubscribe === "function"){
        this.infinityHotSub.unsubscribe();
        log('this.infinityHotSub  was unsubscribed', 'crimson');
      }
    });


    //конечный observable
    const finitHotObs$ = zip(of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9), interval(1000).pipe(take(10))).pipe(share()); 
    // подписываемся на бесконечный observable
    const btn7Click = fromEvent(document.querySelector('#btn7') , 'click').subscribe(_ => {
      const i = this.finitHotCount++;
      this.finitHotSub = finitHotObs$.subscribe(x => log(`finitHotObs$: ${x[0]}`, getColor(i)))
    });
    // отписываемся 
    const btn8Click = fromEvent(document.querySelector('#btn8') , 'click').subscribe(_ => {
      if (this.finitHotSub && typeof this.finitHotSub.unsubscribe === "function"){
        this.finitHotSub.unsubscribe();
        log('this.finitHotSub  was unsubscribed', 'crimson');
      }       
    });

  }


  ngOnDestroy(): void {
    log('ObservablesComponent destroy', 'red');
  }

}
