## General


CTRL + SHIFT + P in Webstorm to show to off variable.



6. What is RxJs? What Problem Does it Solve?
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

7. What is an RxJs Observable? A Simple Explanation
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



