import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { YoutubeComponent } from './youtube.component';
import { LimitToPipe } from '../../shared/limit-to.pipe';
import { YoutubeService } from './youtube.service';
import { Http } from '@angular/http';
import { MockHttp } from '../../shared/test/mock-http.service';
import { ContextService } from '../../shared/context.service';
import { Router } from '@angular/router';
import { MockRouter } from '../../shared/test/mock-router.service';
import createSpy = jasmine.createSpy;
import { MockYoutubeService } from './mock-youtube.service';
import { MockYoutubeVideoModel } from '../../shared/test/mock-youtube-video.model';
import * as moment from 'moment';

describe('YoutubeComponent', () => {
  let component: YoutubeComponent;
  let fixture: ComponentFixture<YoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        YoutubeComponent,
        LimitToPipe
      ],
      providers: [
        { provide: Http, useClass: MockHttp },
        { provide: YoutubeService, useClass: MockYoutubeService },
        ContextService,
        { provide: Router, useClass: MockRouter },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const changeSpy = spyOn(component, 'onCountryChange');
    const bindSpy = createSpy('bindSpy', () => {}).and.returnValue('test2');
    const ctxSpy = spyOn(component['appContext'].countryChanged, 'subscribe');
    component['appContext'].country = 'test';
    component.onCountryChange.bind = bindSpy;
    component.ngOnInit()
    expect(changeSpy).toHaveBeenCalledWith('test');
    expect(ctxSpy).toHaveBeenCalledWith('test2');
    expect(bindSpy).toHaveBeenCalledWith(component);
  });

  it('onCountryChange', () => {
    const loadSpy = spyOn(component, 'loadVideos');
    component.onCountryChange('test');
    expect(loadSpy).toHaveBeenCalled();
    expect(component['country']).toBe('test');
  });

  it('loadVideos', () => {
    const model1 = new MockYoutubeVideoModel();
    const model2 = new MockYoutubeVideoModel('test_id2');
    const statSpy = spyOn(component, 'getVideoStats');
    component['youtubeService']['mockedVideo'] = [
      model1,
      model2
    ];
    component.loadVideos();
    expect(statSpy).toHaveBeenCalledTimes(2);
    expect(component.trendingVideos.length).toBe(2);
    expect(component.trendingVideos[0].id).toBe('test_id');
    expect(component.trendingVideos[1].id).toBe('test_id2');
    expect(component.trendingVideos[0].title).toBe('test_title');
    expect(component.trendingVideos[0].thumbnail).toBe('test_url');
    expect(component.trendingVideos[0].publishedAt).toBe(moment(model1.snippet.publishedAt).fromNow());
  });

  it('getVideoStats', () => {
    const model = new MockYoutubeVideoModel();
    component['youtubeService']['mockedVideo'] = [model];
    component['youtubeService']['mockedStats'] = [
      {
        statistics: {
          viewCount: 1,
          likeCount: 2
        }
      }
    ];
    component.trendingVideos.push({});
    const apiSpy = spyOn(component['youtubeService'], 'getVideoDetails').and.callThrough();
    component.getVideoStats(0, 'test_id');
    expect(apiSpy).toHaveBeenCalledWith('test_id');
    expect(component.trendingVideos[0].likeCount).toBe(2);
    expect(component.trendingVideos[0].viewCount).toBe(1);
  });

  it('openVideoPlayer', () => {
    const navSpy = spyOn(component['router'], 'navigate');
    component.openVideoPlayer('test');
    expect(navSpy).toHaveBeenCalledWith(['/video', 'test']);
  });

  it('onScrollEvent when loading', () => {
    component.loader = true;
    const loadSpy = spyOn(component, 'loadVideos');
    component.onScrollEvent({});
    expect(loadSpy).toHaveBeenCalledTimes(0);
  });

  it('onScrollEvent when scroll is up', () => {
    const loadSpy = spyOn(component, 'loadVideos');
    component.onScrollEvent({
      target: {
        body: {
          scrollHeight: 1000,
          scrollTop: 0
        },
        documentElement: {
          clientHeight: 10
        }
      }
    });
    expect(loadSpy).toHaveBeenCalledTimes(0);
  });

  it('onScrollEvent when scroll is up', () => {
    const loadSpy = spyOn(component, 'loadVideos');
    component.onScrollEvent({
      target: {
        body: {
          scrollHeight: 1000,
          scrollTop: 200
        },
        documentElement: {
          clientHeight: 860
        }
      }
    });
    expect(loadSpy).toHaveBeenCalledTimes(1);
  });

});
