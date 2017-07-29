import { TestBed, inject } from '@angular/core/testing';
import { YoutubeService } from './youtube.service';
import { MockHttp } from '../../shared/test/mock-http.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import createSpy = jasmine.createSpy;

describe('YoutubeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        YoutubeService,
        { provide: Http, useClass: MockHttp }
      ]
    });
  });

  it('should ...', inject([YoutubeService], (service: YoutubeService) => {
    expect(service).toBeTruthy();
  }));

  it('getTrendingVideos with next page', inject([YoutubeService], (service: YoutubeService) => {
    service.getTrendingVideos('test', 'testToken')
      .subscribe(() => {
        expect(service['params'].get('regionCode')).toBe('test');
        expect(service['params'].get('pageToken')).toBe('testToken');
      });
  }));

  it('getTrendingVideos', inject([YoutubeService], (service: YoutubeService) => {
    service.getTrendingVideos('test', null)
      .subscribe(() => {
        expect(service['params'].get('regionCode')).toBe('test');
      });
  }));

  it('getVideoDetails', inject([YoutubeService], (service: YoutubeService) => {
    service.getVideoDetails('test')
      .subscribe(() => {
        expect(service['params'].get('id')).toBe('test');
      });
  }));

  it('api request with error', inject([YoutubeService], (service: YoutubeService) => {
    const responseObs = Observable.throw({status: 'test'});
    service['http']['response'] = responseObs;
    service.getVideoDetails('asd')
      .subscribe(() => {}, (status) => {
        expect(status).toBe('test');
      });
  }))

});
