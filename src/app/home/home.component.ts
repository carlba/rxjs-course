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
    const http$ = createHttpObservable('/api/courses');

    // @ts-ignore
    const courses$: Observable<Course[]> = http$
      .pipe(
        tap(() => console.log('Http request executed')),
        map(res => Object.values(res.payload)),
        shareReplay(),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(2000)),
          take(2)
        ))
      );

    courses$.subscribe();

    this.beginnersCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category === 'BEGINNER'))
      );

    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category === 'ADVANCED'))
      );

  }

}
