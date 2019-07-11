## RxJS 6 In Practise

## General

CTRL + SHIFT + P in Webstorm to show to off variable.

## Section 1: Introduction to RxJs

### 6. What is RxJs? What Problem Does it Solve?
https://www.udemy.com/rxjs-course/learn/lecture/10786004#overview

If we want actions in Javascript to take place after each other there
isn't really any other way then nesting the callbacks such as this. This is what is
sometimes referred to as callback hell. In the next section we will show how to handle 
this. This is what RxJs (Reactive extensions to Javascript) does best.  

```js
document.addEventListener('click', evt => {
  console.log(evt);

  setTimeout(() => {
    console.log('finished...');

    let counter = 0;

    setInterval(() => {

      console.log(counter);
      counter++;
      
    }, 1000);

  }, 3000);
});
```

### 7. What is an RxJs Observable? A Simple Explanation
https://www.udemy.com/rxjs-course/learn/lecture/10786244#overview

This is a definition of a stream not the actual stream. 

```js
const interval$ = interval(1000);
```

The observable converts to a stream when we subscribe to it, like so:

```js
const interval$ = interval(1000);
interval$.subscribe((val) => console.log(`stream 1 ${val}`));
```

Listen to all click events on document and log the events

```js
const click$ = fromEvent(document, 'click');
click$.subscribe(event => console.log(event));
```

### 8. 3 Core RxJs Concepts - Errors, Completion and Subscriptions
https://www.udemy.com/rxjs-course/learn/lecture/10786880#overview


```js
click$.subscribe(
  event => console.log(event),
  err => console.log(err),
  () => console.log('completed')
);
```

`event` will run for each of the triggered events.
`err` will run if an error happens during execution of the event.
`complete` will be triggered when the subscription has finished.

Note that the event callback will not be triggered after the observable has
been errored out or completed.

### 9. Learn How Observables Work Under the Hood, Build Your Own HTTP Observable
https://www.udemy.com/rxjs-course/learn/lecture/10787208#overview

A promise differs from an Observable in that is is automatically executed when defined.

An Observable can be created, like so:

```typescript
import { Observable, Observer } from 'rxjs';
    const http$ = new Observable((observer: Observer<any>) => {
      fetch('/api/courses')
        .then(response => {
          return response.json();
        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });
```

Subscribe to it, like so:

```js
http$.subscribe(
  (courses) => console.log(courses),
  noop,
  () => console.log('completed'));
```

## Section 2: Essential RxJs Operators + Reactive Design

### 10. What are RxJs Operators? Learn the Map Operator
https://www.udemy.com/rxjs-course/learn/lecture/10787498#questions

Get a certain part ob the observable output, like so: 

```js
const courses$ = http$
  .pipe(
  map(res => res.payload)
);
```

### 11. Building Components with RxJs - Imperative Design
https://www.udemy.com/rxjs-course/learn/lecture/10788042#questions

This is how you could populate contents of a component in a imperative way:

```typescript
courses$.subscribe(
  courses => {
    this.beginnersCourses = courses.filter(course => course.category === 'BEGINNER');
    this.advancedCourses = courses.filter(course => course.category === 'ADVANCED');
    console.log(courses);
  },
  noop,
  () => console.log('completed'));
```


### 12. Building Components with RxJs - Reactive Design
https://www.udemy.com/rxjs-course/learn/lecture/10788264#questions/7575340

A much better approach is applying the filters directly to the observable using pipe to derive a new observable, like so:
```typescript
this.beginnersCourses$ = courses$
  .pipe(
    map(courses => courses.filter(course => course.category === 'BEGINNER'))
  );

```

This observable can now be used in the template using the async pipe, like so:
```html
<courses-card-list [courses]="beginnersCourses$ | async">
</courses-card-list>
```

### 13. Sharing HTTP Responses with the shareReplay Operator
https://www.udemy.com/rxjs-course/learn/lecture/10798736#questions/7575340

The problem with the solution in 12 is that it actually triggers two separate http requests. The reason for

this is that we subscribe to the derived observables twice. Since the observables are only blueprints they
are actually triggered one per subscription. The shareReplay operator can be used to reuse the action defined
in the event blueprint to all subscribers.

The tap operator can be used to generate a side effect such as logging in a pipe chain.


### 14. RxJs Higher-Order Mapping Operators PDF
https://www.udemy.com/rxjs-course/learn/lecture/11121570#questions/7575340

See [PDF](docs/rxjs-higher-order-mapping.pdf)

### 15. Observable Concatenation - In-Depth Explanation
https://www.udemy.com/rxjs-course/learn/lecture/10799008#questions/7575340

The concat operator can be used to concatinate values from multiple observables. 
It will output the values from each of them in order so until all values from the first source is
outputted the values from the second source wont be acted upon.

```typescript
import { concat, noop, Observable, Observer, of } from 'rxjs';
const source1$ = of(1, 2, 3);
const source2$ = of(4, 5, 6);
const source3$ = of(7, 8, 9);

const result$ = concat(source1$, source2$, source3$);

result$.subscribe(value => console.log(value));
```

### 16. Form Draft Pre-Save Example and the RxJs Filter Operator
https://www.udemy.com/rxjs-course/learn/lecture/10799520#questions/7575340

* Always try to avoid nesting multiple subscriptions


### 17. The RxJs concatMap Operator - In-Depth Explanation and Practical Example
https://www.udemy.com/rxjs-course/learn/lecture/10807250#questions/7575340

Use [concatMap](https://www.learnrxjs.io/operators/transformation/concatmap.html) operator to wait for the previous operator to finishing before starting the next.

### 18. Understanding the merge Observable combination Strategy
https://www.udemy.com/rxjs-course/learn/lecture/10807622#questions/7575340

```typescript
const interval1$ = interval(1000);
const interval2$ = interval1$.pipe(map(val => 10 * val));

merge(interval1$, interval2$).subscribe(console.log);
```



### 19. The RxJs mergeMap Operator - In-Depth Explanation
https://www.udemy.com/rxjs-course/learn/lecture/10807624#questions/7575340

[mergeMap](https://www.learnrxjs.io/operators/transformation/mergemap.html)

Use to fire of multiple http requests simultaneously and waiting for them all to finish

### 20. The RxJs exhaustMap Operator - In-Depth Explanation
https://www.udemy.com/rxjs-course/learn/lecture/10807892#questions/7575340

[exhaustMap]https://www.learnrxjs.io/operators/transformation/exhaustmap.html

Use it to don't allow more triggerings of an observable while the previous one is
still running.

### 21. Unsubscription In Detail - Implementing a Cancellable HTTP Observable

https://www.udemy.com/rxjs-course/learn/lecture/10808502#questions/7575340

This lessons shows how to cancel an observable

### 22. Setting Up the Course Component
[switchMap](https://www.learnrxjs.io/operators/transformation/switchmap.html)

https://www.udemy.com/rxjs-course/learn/lecture/10809602#questions/7575340

### 23. Building a Search Typeahead - debounceTime and distinctUntilChanged Operators
https://www.udemy.com/rxjs-course/learn/lecture/10810286#questions/7575340

This shows how to only emit values if the observable has been stable for
a certain amount of time and the value has changes to prevent duplicates.

### 24. Finishing the Search Typeahead - The switchMap Operator
https://www.udemy.com/rxjs-course/learn/lecture/10810514#questions/7575340

### 25. RxJs Error Handling - PDF Guide
See [PDF](docs/rxjs-error-handling.pdf)

### 26. RxJs Error Handling - The Catch and Replace Error Handling Strategy
https://www.udemy.com/rxjs-course/learn/lecture/10810740#questions/7575340

Handling HTTP error by returning a replacement value


### 27. The Catch and Rethrow RxJs Error Handling Strategy and the finalize Operator
https://www.udemy.com/rxjs-course/learn/lecture/10810908#questions/7575340

If we want the catchError or finalize operator to only be trigged once
for all subscriptions but then in top of the chain, like so:

```typescript
const courses$: Observable<Course[]> = http$
  .pipe(
    catchError(err => {
        console.log('Error occurred: ', err);
        return throwError(err);
      }
    ),
    finalize(() => {
      console.log('finalize');
    }),
    tap(() => console.log('Http request executed')),
    map(res => Object.values(res.payload)),
    shareReplay()
  );
```

### 28. The Retry RxJs Error Handling Strategy.screenflow
https://www.udemy.com/rxjs-course/learn/lecture/10811018#questions/7575340

Delay failed http with x amount of seconds. If you want to only retry 3 times add the 
take(3) operator to the errors.pipe.

### 29. The startWith RxJs Operator - Simplifying the Course Component
https://www.udemy.com/rxjs-course/learn/lecture/10885880#questions/5970900

Give a observable a start value using startsWith operator.

### 30. RxJs Throttling vs Debouncing - Understand the
https://www.udemy.com/rxjs-course/learn/lecture/10886858#questions/5970900

```typescript
ngAfterViewInit() {
  fromEvent<any>(this.input.nativeElement, 'keyup')
    .pipe(
      map(event => event.target.value),
      throttleTime(500),
    ).subscribe(console.log);

}

```

### 31. Implementing a Custom RxJs Operator - the Debug Operator
https://www.udemy.com/rxjs-course/learn/lecture/10886340#questions/5970900

### 32. The RxJs Debug Operator - Implementation Conclusion 
