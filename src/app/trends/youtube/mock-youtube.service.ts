import { Observable } from 'rxjs/Observable';
import { MockResponse } from '../../shared/test/mock-response';
export class MockYoutubeService {

  public mockedVideo: any[] = [];
  public mockedStats: any[] = [];

  getTrendingVideos() {
    return Observable.create((obs) => {
      obs.next(new MockResponse({items: this.mockedVideo}));
    })
      .map((res) => res.json());
  }

  getVideoDetails() {
    return Observable.create((obs) => {
      obs.next(new MockResponse({items: this.mockedStats}));
    })
      .map((res) => res.json());
  }
}
