import { Observable, Observer } from 'rxjs';

export const createHttpObservable = (url: string): Observable<{payload: {}}> => {
  return new Observable((observer: Observer<any>) => {
    fetch(url)
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
};


