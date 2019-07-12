import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { debounceTime, distinctUntilChanged, first, map, startWith, switchMap, tap } from 'rxjs/operators';
import { forkJoin, fromEvent, Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { debug, RxJsLoggingLevel, setRxJsLoggingLevel } from '../common/debug';
import { Store } from '../common/store.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  courseId: number;
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  @ViewChild('searchInput', {static: true}) input: ElementRef;

  constructor(private route: ActivatedRoute, private store: Store) {


  }

  ngOnInit() {

    this.courseId = +this.route.snapshot.paramMap.get('id');

    // const course$ = createHttpObservable(`/api/courses/${courseId}`);
    // const lessons$ = this.loadLessons();
    //
    // forkJoin(course$, lessons$).pipe(
    //   tap(([course, lessons]) => {
    //     console.log('course', course);
    //     console.log('lessons', lessons);
    //   })
    // )
    // .subscribe();

    this.course$ = this.store.selectCourseById(this.courseId);

    setRxJsLoggingLevel(RxJsLoggingLevel.INFO);

  }

  ngAfterViewInit() {
    this.lessons$ =  fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        startWith(''),
        debug(RxJsLoggingLevel.TRACE, 'search'),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.loadLessons(search)),
        debug(RxJsLoggingLevel.DEBUG, 'lessons value')
      );

  }

  loadLessons(search = ''): Observable<Lesson[]> {

    return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
      .pipe(
        tap(res => console.log(res)),
        map(res => res['payload'])
      );

  }
}
