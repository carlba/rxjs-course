6. What is RxJs? What Problem Does it Solve?

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
