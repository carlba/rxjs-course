import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, concat, interval, merge, noop, Observable, Observer, of, ReplaySubject, Subject } from 'rxjs';
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

    const subject = new AsyncSubject(); // Only last value before completion
    // const subject = new AsyncSubject(); // All values emitted in the history of subject
    const series1$ = subject.asObservable();

    series1$.subscribe(val => console.log(`first sub: `, val), console.log, console.log);

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.complete();

    setTimeout(() => {
      series1$.subscribe(val => console.log('second sub:', val));



    }, 1000);

  }
}
