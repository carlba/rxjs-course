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

