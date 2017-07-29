import { Component, HostListener, OnInit } from '@angular/core';

import { YoutubeService } from './youtube.service';
import { ContextService } from '../../shared/context.service';

import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'youtube',
  templateUrl: './youtube.component.html'
})
export class YoutubeComponent implements OnInit {

  private country: any;
  private NEW_PAGE_SCROLL_OFFSET: number = 200;
  private nextPageToken: any;
  public loader: boolean;
  public trendingVideos: any[] = [];

  constructor(
    private youtubeService: YoutubeService,
    private appContext: ContextService,
    private router: Router
  ) {
    console.log('constructor');
  }

  public ngOnInit(): void {
    console.log('ngOnInit');
    this.onCountryChange(this.appContext.country);
    this.appContext.countryChanged.subscribe(this.onCountryChange.bind(this));
  }

  // Window scroll event to start loading next pages
  @HostListener('window:scroll', ['$event'])
  public onScrollEvent($event): void {
    if (!this.loader) {
      const documentEl = $event.target.documentElement;
      const bodyEl = $event.target.body;
      const documentScrollHeight = bodyEl.scrollHeight;
      const scrollOffset = bodyEl.scrollTop;
      const clientHeight = documentEl.clientHeight;
      if (documentScrollHeight - scrollOffset <= clientHeight + this.NEW_PAGE_SCROLL_OFFSET) {
        this.loadVideos();
      }
    }
  }

  // Sets new country. Clears out prev data and start loading new videos
  public onCountryChange(country: any): void {
    this.country = country;
    this.trendingVideos = [];
    this.nextPageToken = null;
    this.loadVideos();
  }

  public loadVideos(): void {
    this.loader = true;
    this.youtubeService
      .getTrendingVideos(this.country, this.nextPageToken)
      .subscribe((result) => {
        this.nextPageToken = result.nextPageToken;
        result.items.forEach((item, index) => {
          this.trendingVideos.push({
            id: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            publishedAt: moment(item.snippet.publishedAt).fromNow()
          });
          this.getVideoStats(index, item.id);
        });
        this.loader = false;
      });
  }

  public getVideoStats(videoIndex: number, videoId: any): void {
    this.youtubeService
      .getVideoDetails(videoId)
      .subscribe((result) => {
        this.trendingVideos[videoIndex].viewCount = result.items[0].statistics.viewCount;
        this.trendingVideos[videoIndex].likeCount = result.items[0].statistics.likeCount;
      });
  }

  // navigate to video page on click
  public openVideoPlayer(videoId: any): void {
    this.router.navigate(['/video', videoId]);
  }

}
