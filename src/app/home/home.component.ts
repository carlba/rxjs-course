import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { EMPTY, interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delayWhen, filter, finalize, map, retryWhen, shareReplay, take, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { Store } from '../common/store.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnersCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private store: Store) {

  }

  ngOnInit() {

    const courses$ = this.store.courses$;

    this.beginnersCourses$ = this.store.selectBeginnerCourses();

    this.advancedCourses$ = this.store.selectAdvancedCourses();

  }

}
