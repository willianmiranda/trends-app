import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { youtubeEmbedHost } from '../../config';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  public isLoading: boolean;
  public embedUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.initEvents();
  }

  // Init Events - subscribe to url change, and set the embedUrl for video
  public initEvents(): void {
    this.route.params.subscribe((params) => {
      if (params.videoId) {
        this.startLoading();
        this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `${youtubeEmbedHost}${params.videoId}?autoplay=1`
        );
      }
    });
  }

  public startLoading(): void {
    this.isLoading = true;
  }

  public stopLoading(): void {
    this.isLoading = false;
  }

}
