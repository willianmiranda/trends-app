import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { AppRoutingModule } from './app.routes';
import { VideoListComponent } from './pages/video-list/video-list.component';
import { VideoComponent } from './pages/video/video.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadConfig, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TrendsComponent } from './trends/trends.component';
import { YoutubeComponent } from './trends/youtube/youtube.component';
import { LimitToPipe } from './shared/limit-to.pipe';
import { APP_BASE_HREF } from '@angular/common';
import { ContextService } from './shared/context.service';

describe('AppComponent', () => {
  let fixture, app;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        NgbTypeaheadModule,
        NgbModule,
        FormsModule,
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        VideoListComponent,
        VideoComponent,
        TrendsComponent,
        YoutubeComponent,
        LimitToPipe
      ],
      providers: [
        NgbTypeaheadConfig,
        { provide: APP_BASE_HREF, useValue : '/' },
        ContextService
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
