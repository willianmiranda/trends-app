import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoListComponent } from './video-list.component';
import { TrendsComponent } from '../../trends/trends.component';
import { YoutubeComponent } from '../../trends/youtube/youtube.component';
import { LimitToPipe } from '../../shared/limit-to.pipe';
import { YoutubeService } from '../../trends/youtube/youtube.service';
import { ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MockHttp } from '../../shared/test/mock-http.service';
import { ContextService } from '../../shared/context.service';
import { Router } from '@angular/router';
import { MockRouter } from '../../shared/test/mock-router.service';
import { MockYoutubeService } from '../../trends/youtube/mock-youtube.service';

describe('VideoListComponent', () => {
  let component: VideoListComponent;
  let fixture: ComponentFixture<VideoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoListComponent,
        TrendsComponent,
        YoutubeComponent,
        LimitToPipe
      ],
      providers: [
        { provide: YoutubeService, useClass: MockYoutubeService },
        { provide: Http, useClass: MockHttp },
        { provide: Router, useClass: MockRouter },
        { provide: ConnectionBackend, useClass: MockBackend },
        ContextService
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VideoListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
