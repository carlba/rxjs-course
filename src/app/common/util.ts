import { Observable, Observer } from 'rxjs';

export const createHttpObservable = (url: string): Observable<any> => {
  return new Observable((observer: Observer<any>) => {

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, {signal})
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          observer.error(`Request failed with status code: ${response.status}`);
        }

      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });
    return () => controller.abort();
  });
};


