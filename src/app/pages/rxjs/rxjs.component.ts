import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.returnObservable()
    // .pipe(
    //   retry(2)
    // )
    .subscribe(
      value => console.log(`Subs ${value}`),
      error => console.log(`Error in observer: ${error}`),
      () => console.log(`The observer finished !!!`)
    );
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('The page is going to close');
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable( observer => {

      let count = 0;

      const returnValue = {
        countValue: count
      };

      const interval = setInterval( () => {
        count += 1;
        returnValue.countValue = count;
        observer.next(returnValue);

        // complete observable
        // if (count === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // throw an error
        // if (count === 2) {
        //   observer.error('Help!!');
        // }

      }, 1000);

    }).pipe(
      map((resp: any) => resp.countValue),
      filter((value, index) => {
        if ((value % 2) === 1) {
          // impar
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
