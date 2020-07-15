import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable, from } from 'rxjs';
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private sub: Subscription

  constructor() { }

  ngOnInit() {
    // this.sub = interval(1000).subscribe(
    //   (count => {
    //     console.log(count);

    //   })
    // )
    const customIntervalObservable = Observable.create(
      observer => {
        let count = 0;
        setInterval(()=>{
          observer.next(count);
          count++;
          if (count === 2) {
            observer.complete();
          }
          if (count === 3) {
            observer.error('count === 3');
          }
        },1000)
      }
    )

    this.sub = customIntervalObservable.pipe(filter((data)=>{
      return data>0
    }),map((data: number) => {
      return "Round: " + (data+1)
    })).subscribe(
      (data) => {
        console.log(data);
      }, (error) => {
        console.log("Error: "+error);
      }, () => {
        console.log("Completed!");
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
