import { Component, OnInit } from '@angular/core';
import { noop, Observable, Observer } from 'rxjs';
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

    const http$ = createHttpObservable('/api/courses');


    http$.subscribe(
      (courses) => console.log(courses),
      noop,
      () => console.log('completed'));

  }
}
