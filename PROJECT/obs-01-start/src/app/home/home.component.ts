import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { count } from 'console';

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
        },1000)
      }
    )

    this.sub = customIntervalObservable.subscribe(
      (data) => {
        console.log(data);

      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
