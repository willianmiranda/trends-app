import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class MockActivatedRoute {

  public params: Observable<any> = Observable.create((obs) => {
    obs.next({});
  });

}
