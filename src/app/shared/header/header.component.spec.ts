import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadConfig, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ContextService } from '../context.service';
import { Router } from '@angular/router';
import { MockRouter } from '../test/mock-router.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbTypeaheadModule,
        NgbModule,
        FormsModule
      ],
      declarations: [
        HeaderComponent
      ],
      providers: [
        ContextService,
        { provide: Router, useClass: MockRouter },
        NgbTypeaheadConfig
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selectCountry', () => {
    const navSpy = spyOn(component['router'], 'navigate');
    const ctxSpy = spyOn(component['appContext'], 'setCountry');
    component.selectCountry(false);
    expect(navSpy).toHaveBeenCalledTimes(0);
    expect(ctxSpy).toHaveBeenCalledTimes(0);
    component.selectCountry(component.countryList[0]);
    expect(navSpy).toHaveBeenCalledTimes(1);
    expect(navSpy).toHaveBeenCalledWith(['/video-list']);
    expect(ctxSpy).toHaveBeenCalledTimes(1);
    expect(ctxSpy).toHaveBeenCalledWith(component.countryList[0].code);
  });

  it('search with existing country', (done) => {
    const mockedObs = Observable.create((obs) => {
      obs.next('Afghanistan');
    });
    const searchResult = component.search(mockedObs);
    searchResult.subscribe((countryList) => {
      expect(countryList.length).toBe(1);
      expect(countryList[0]).toBe(component.countryList[0]);
      done();
    });
  });

  it('search with small term', (done) => {
    const mockedObs = Observable.create((obs) => {
      obs.next('a');
    });
    const searchResult = component.search(mockedObs);
    searchResult.subscribe((countryList) => {
      expect(countryList.length).toBe(0);
      done();
    });
  });

  it('formatter', () => {
    expect(component.formatter({name: 'test'})).toBe('test');
  });

});
