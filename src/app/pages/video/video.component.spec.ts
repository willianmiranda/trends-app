import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoComponent } from './video.component';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../shared/test/mock-activated-route';
import { By, DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

describe('VideoComponent', () => {
  let component: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        DomSanitizer
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VideoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const spy = spyOn(component, 'initEvents');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('initEvents', () => {
    let mockedObs = Observable.create((obs) => {
      obs.next({videoId: 'test'});
    });
    component['route'].params = mockedObs;
    const spyUrl = spyOn(component['sanitizer'], 'bypassSecurityTrustResourceUrl').and.returnValue('test1');
    component.initEvents();
    expect(spyUrl).toHaveBeenCalledWith('https://www.youtube.com/embed/test?autoplay=1');
    expect(component.embedUrl).toBe('test1');
    mockedObs = Observable.create((obs) => {
      obs.next({});
    });
    component['route'].params = mockedObs;
    component.initEvents();
    expect(spyUrl).toHaveBeenCalledTimes(1);
  });

  it('startLoading', () => {
    component.startLoading();
    expect(component.isLoading).toBeTruthy();
    fixture.detectChanges();
    const loaderEl = fixture.debugElement.query(By.css('.video-load')).nativeElement;
    const videoEl = fixture.debugElement.query(By.css('.video-embed')).nativeElement;
    const style = window.getComputedStyle(videoEl);
    expect(style.display).toBe('none');
    expect(loaderEl).toBeTruthy();
  });

  it('stopLoading', () => {
    component.stopLoading();
    expect(component.isLoading).toBeFalsy();
    fixture.detectChanges();
    const loaderEl = fixture.debugElement.query(By.css('.video-load'));
    const videoEl = fixture.debugElement.query(By.css('.video-embed')).nativeElement;
    const style = window.getComputedStyle(videoEl);
    expect(style.display).not.toBe('hidden');
    expect(loaderEl).toBeFalsy();
  });
});
