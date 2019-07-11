import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, concat, interval, merge, noop, Observable, Observer, of, Subject } from 'rxjs';
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

    const subject = new BehaviorSubject(0);
    const series1$ = subject.asObservable();

    series1$.subscribe(val => console.log(`early sub: `, val), console.log, console.log);

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.complete();


    setTimeout(() => {
      series1$.subscribe(val => console.log(`late sub:`, val));
      subject.next(4);
    });






  }
}
