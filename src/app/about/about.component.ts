import { Component, OnInit } from '@angular/core';
import { concat, interval, merge, noop, Observable, Observer, of } from 'rxjs';
import { createHttpObservable } from '../common/util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // const interval1$ = interval(1000);
    // const interval2$ = interval1$.pipe(map(val => 10 * val));
    //
    // merge(interval1$, interval2$).subscribe(console.log);
    //


  }
}
