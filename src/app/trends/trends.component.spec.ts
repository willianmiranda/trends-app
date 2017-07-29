import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TrendsComponent } from './trends.component';
import { Http, HttpModule } from '@angular/http';
import { YoutubeComponent } from './youtube/youtube.component';
import { LimitToPipe } from '../shared/limit-to.pipe';
import { MockHttp } from '../shared/test/mock-http.service';
import { YoutubeService } from './youtube/youtube.service';
import { ContextService } from '../shared/context.service';
import { Router } from '@angular/router';
import { MockRouter } from '../shared/test/mock-router.service';
import { MockYoutubeService } from './youtube/mock-youtube.service';

describe('TrendsComponent', () => {
  let component: TrendsComponent;
  let fixture: ComponentFixture<TrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      declarations: [
        YoutubeComponent,
        LimitToPipe,
        TrendsComponent
      ],
      providers: [
        { provide: Http, useClass: MockHttp },
        { provide: YoutubeService, useClass: MockYoutubeService },
        ContextService,
        { provide: Router, useClass: MockRouter },
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TrendsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
