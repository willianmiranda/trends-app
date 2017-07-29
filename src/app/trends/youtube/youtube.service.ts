import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as CONFIG from '../../config';

@Injectable()
export class YoutubeService {
  private params: any;
  private options: any;

  constructor(private http: Http) { }

  public getTrendingVideos(country: string, nextPageToken: string): Observable<any> {
    this.params = new URLSearchParams();
    this.params.set('part', 'snippet');
    this.params.set('chart', 'mostPopular');
    this.params.set('regionCode', country);
    this.params.set('maxResults', '24');
    this.params.set('key', CONFIG.youtubeApiKey);
    // Checks if its a pagination requests and sets the token
    if (nextPageToken) {
      this.params.set('pageToken', nextPageToken);
    }
    this.options = new RequestOptions({
      search: this.params
    });
    return this.request(this.options);
  }

  public getVideoDetails(videoId: string): Observable<any> {
    this.params = new URLSearchParams();
    this.params.set('part', 'statistics');
    this.params.set('id', videoId);
    this.params.set('key', CONFIG.youtubeApiKey);
    this.options = new RequestOptions({
      search: this.params
    });
    return this.request(this.options);
  }

  // Sends API request to Youtube
  private request(options: RequestOptions): Observable<any> {
    return this.http.get(CONFIG.youtubeEndPoint, options)
      .map(res => res.json())
      .catch(this.throwError);
  }

  private throwError(error: any): Observable<any> {
    return Observable.throw(error.status);
  }
}
