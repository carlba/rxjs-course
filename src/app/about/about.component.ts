import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, interval, timer } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // Callback hell
    // document.addEventListener('click', evt => {
    //   console.log(evt);
    //
    //   setTimeout(() => {
    //     console.log('finished...');
    //
    //     let counter = 0;
    //
    //     setInterval(() => {
    //
    //       console.log(counter);
    //       counter++;
    //
    //     }, 1000);
    //
    //   }, 3000);
    // });

    // const interval$ = interval(1000);
    //
    // interval$.subscribe((val) => console.log(`stream 1 ${val}`));
    // interval$.subscribe((val) => console.log(`stream 2 ${val}`));

    const timer$ = timer(3000, 1000);

    const sub = timer$.subscribe((val) => console.log(`stream 3 ${val}`));
    setTimeout(() => sub.unsubscribe(), 5000);

    const click$ = fromEvent(document, 'click');

    click$.subscribe(
      event => console.log(event),
      err => console.log(err),
      () => console.log('completed')
    );

  }
}
