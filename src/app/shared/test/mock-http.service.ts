import { Observable } from 'rxjs/Observable';
import { MockResponse } from './mock-response';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
export class MockHttp {

  public response = Observable.create((obs) => {
    obs.next(new MockResponse());
  });

  public get() {
    return this.response;
  }
}
