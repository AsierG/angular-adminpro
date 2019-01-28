import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.countThree().then(
      value => console.log(`Finish, value: ${value}`)
    ).catch(error => console.log(`Error in promise, error: ${error}`));

  }

  ngOnInit() {
  }

  countThree(): Promise<boolean> {
      return new Promise( (resolve, reject) => {
        let count = 0;
        const interval = setInterval( () => {
          count += 1;
          console.log(count);
          if (count === 3) {
            resolve(true);
            // reject('error!!');
            clearInterval(interval);
          }
        }, 1000);
      });
  }

}
