import { getGroup, watch } from 'rxjs-watcher';
import { ConnectableObservable, from, fromEvent, interval, Subject, Subscription, zip } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { log } from '../../services/console.service';
import { multicast, publish, publishBehavior, publishLast, publishReplay, refCount, share, shareReplay, tap } from 'rxjs/operators';
import { getColor } from '../../services/colors.service';

@Component({
  selector: 'app-connectable',
  templateUrl: './connectable.component.html',
  styleUrls: ['./connectable.component.css']
})
export class ConnectableComponent implements OnInit, OnDestroy {

  counter = {
    mult: 0,
    ref: 0,
    publish: 0,
    behaviorPublish: 0,
    replayPublish: 0,
    lastPublish: 0,
    share: 0,
    shareReplay: 0
  }
  constructor() { }

  ngOnInit(): void {
    log('ConnectableComponent init', 'green');


    const infinityColdObs$ = interval(1000).pipe(tap(x => log('source obs:' + x)));

    //  -- Multicasted Observable --  //
    const multiWatch = getGroup('multicasted');
    const multicasted$ = infinityColdObs$.pipe(multiWatch('multicasted'), multicast(() => new Subject())) as ConnectableObservable<any>;
    let connectableSub: Subscription;
    let multicastedSub: Subscription;

    fromEvent(document.querySelector('#btn1') , 'click').subscribe(_ => {
      const i = this.counter.mult++;   
      connectableSub = multicasted$.pipe(multiWatch('multicasted_obs #' + i)).subscribe(x => log(`multicasted obs_${i}: ${x}`, getColor(i)));
    });
    fromEvent(document.querySelector('#btn1-connect') , 'click').subscribe(_ => {
      multicastedSub = multicasted$.connect();
    });
    fromEvent(document.querySelector('#btn1-close') , 'click').subscribe(_ => {
      connectableSub.unsubscribe(); // отписка от потока

    });
    fromEvent(document.querySelector('#btn1-close2') , 'click').subscribe(_ => {
      multicastedSub.unsubscribe(); // отписка от мультикаста
    });



    //publish = multicast(() => new Subject())
    const publishWatch = getGroup("publish");
    const publish$ = infinityColdObs$.pipe(publishWatch('infinityColdPublish'), publish()) as ConnectableObservable<any>;
    let publishConnectableSub: Subscription[] = new Array<Subscription>();
    let publishMulticastedSub: Subscription;

    fromEvent(document.querySelector('#btn3') , 'click').subscribe(_ => {
      const i = this.counter.publish++;   
      publishConnectableSub.push(publish$.pipe(publishWatch('Publish subscriber #' + i)).subscribe(x => log(`publish obs_${i}: ${x}`, getColor(i))));
    });
    fromEvent(document.querySelector('#btn3-connect') , 'click').subscribe(_ => {
      publishMulticastedSub = publish$.connect();
    });
    fromEvent(document.querySelector('#btn3-close') , 'click').subscribe(_ => {
      publishConnectableSub.forEach(sub => sub.unsubscribe()); // отписка от потоков
      this.counter.publish = 0;
    });
    fromEvent(document.querySelector('#btn3-close2') , 'click').subscribe(_ => {
      publishMulticastedSub.unsubscribe(); // отписка от мультикаста

    });

    //publishBehavior = multicast(new BehaviorSubject())
    const behaviorWatch = getGroup("publishBehavior");
    const bpublish$ = infinityColdObs$.pipe(behaviorWatch('infinityColdBehaviorPublish'), publishBehavior(1000)) as ConnectableObservable<any>;
    let bpublishConnectableSub: Subscription[] = new Array<Subscription>();
    let bpublishMulticastedSub: Subscription;

    fromEvent(document.querySelector('#btn4') , 'click').subscribe(_ => {
      const i = this.counter.behaviorPublish++;   
      bpublishConnectableSub.push(bpublish$.pipe(behaviorWatch('PublishBehavior subscriber #' + i)).subscribe(x => log(`publishBehavior obs_${i}: ${x}`, getColor(i))));
    });
    fromEvent(document.querySelector('#btn4-connect') , 'click').subscribe(_ => {
      bpublishMulticastedSub = bpublish$.connect();
    });
    fromEvent(document.querySelector('#btn4-close') , 'click').subscribe(_ => {
      bpublishConnectableSub.forEach(sub => sub.unsubscribe()); // отписка от потоков
      this.counter.behaviorPublish = 0;
    });
    fromEvent(document.querySelector('#btn4-close2') , 'click').subscribe(_ => {
      bpublishMulticastedSub.unsubscribe(); // отписка от мультикаста

    });
    // publishReplay = 
    const replayWatch = getGroup("publishReplay");
    const rpublish$ = infinityColdObs$.pipe(replayWatch('infinityColdReplayPublish'), publishReplay(3)) as ConnectableObservable<any>;
    let rpublishConnectableSub: Subscription[] = new Array<Subscription>();
    let rpublishMulticastedSub: Subscription;

    fromEvent(document.querySelector('#btn5') , 'click').subscribe(_ => {
      const i = this.counter.replayPublish++;   
      rpublishConnectableSub.push(rpublish$.pipe(replayWatch('PublishReplay subscriber #' + i)).subscribe(x => log(`publishReplay obs_${i}: ${x}`, getColor(i))));
    });
    fromEvent(document.querySelector('#btn5-connect') , 'click').subscribe(_ => {
      rpublishMulticastedSub = rpublish$.connect();
    });
    fromEvent(document.querySelector('#btn5-close') , 'click').subscribe(_ => {
      rpublishConnectableSub.forEach(sub => sub.unsubscribe()); // отписка от потоков
      this.counter.replayPublish = 0;
    });
    fromEvent(document.querySelector('#btn5-close2') , 'click').subscribe(_ => {
      rpublishMulticastedSub.unsubscribe(); // отписка от мультикаста

    });
    //publish last
    const lastWatch = getGroup("publishLast");
    const lpublish$ = zip(from([1, 2, 3, 4, 5, 6, 7]), interval(1000)).pipe(lastWatch('finitColdLastPublish'), publishLast()) as ConnectableObservable<any>;
    let lpublishConnectableSub: Subscription[] = new Array<Subscription>();
    let lpublishMulticastedSub: Subscription;

    fromEvent(document.querySelector('#btn6') , 'click').subscribe(_ => {
      const i = this.counter.lastPublish++;   
      lpublishConnectableSub.push(lpublish$.pipe(lastWatch('PublishReplay subscriber #' + i)).subscribe(x => log(`publishReplay obs_${i}: ${x}`, getColor(i))));
    });
    fromEvent(document.querySelector('#btn6-connect') , 'click').subscribe(_ => {
      lpublishMulticastedSub = lpublish$.connect();
    });
    fromEvent(document.querySelector('#btn6-close') , 'click').subscribe(_ => {
      lpublishConnectableSub.forEach(sub => sub.unsubscribe()); // отписка от потоков
      this.counter.lastPublish = 0;
    });
    fromEvent(document.querySelector('#btn6-close2') , 'click').subscribe(_ => {
      lpublishMulticastedSub.unsubscribe(); // отписка от мультикаста
    });

    // refCount
    const refCount$ = infinityColdObs$.pipe(multicast(() => new Subject()), refCount()) as ConnectableObservable<any>;
    let refSub: Subscription; 
    fromEvent(document.querySelector('#btn2') , 'click').subscribe(_ => {
      const i = this.counter.ref++;   
      refSub = refCount$.subscribe(x => log(`refCount obs_${i}: ${x}`, getColor(i)));
    });
    fromEvent(document.querySelector('#btn2-close') , 'click').subscribe(_ => {
      refSub.unsubscribe();
    });

    //share =  multicast(() => new Subject()) + refCount()
    const shareWatch = getGroup("share");
    const share$ = infinityColdObs$.pipe(shareWatch('infinityColdShare'), share()) as ConnectableObservable<any>;
    let shareSub: Subscription; 
    fromEvent(document.querySelector('#btn7') , 'click').subscribe(_ => {
      const i = this.counter.share++;   
      shareSub = share$.pipe(shareWatch('share obs' + i)).subscribe(x => log(`share obs_${i}: ${x}`, getColor(i)));
    });
    fromEvent(document.querySelector('#btn7-close') , 'click').subscribe(_ => {
      shareSub.unsubscribe();
    });


    //shareReplay
    const shareReplayWatch = getGroup("shareReplay");
    const shareReplay$ = infinityColdObs$.pipe(shareReplayWatch('infinityColdShare'), shareReplay({ refCount: true, bufferSize: 3 })) as ConnectableObservable<any>;
    let shareReplaySub: Subscription; 
    fromEvent(document.querySelector('#btn8') , 'click').subscribe(_ => {
      const i = this.counter.shareReplay++;   
      shareReplaySub = shareReplay$.pipe(shareReplayWatch('shareReplay obs' + i)).subscribe(x => log(`shareReplay obs_${i}: ${x}`, getColor(i)));
    });
    fromEvent(document.querySelector('#btn8-close') , 'click').subscribe(_ => {
      shareReplaySub.unsubscribe();
    });
  }
  ngOnDestroy(): void {
    log('ConnectableComponent destroy', 'red');
  }
}//последовательность событий на временной шкале
