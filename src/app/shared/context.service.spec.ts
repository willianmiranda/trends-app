import { TestBed, inject } from '@angular/core/testing';
import { ContextService } from './context.service';
import createSpy = jasmine.createSpy;

describe('ContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextService]
    });
  });

  it('should ...', inject([ContextService], (service: ContextService) => {
    expect(service).toBeTruthy();
  }));

  it('setCountry', inject([ContextService], (service: ContextService) => {
    const subSpy = createSpy('subSpy', () => {});
    service.countryChanged.subscribe(subSpy);
    service.setCountry('test');
    expect(service.country).toBe('test');
    expect(subSpy).toHaveBeenCalledWith('test');
  }));

  it('getCountry', inject([ContextService], (service: ContextService) => {
    service.country = 'test1';
    expect(service.getCountry()).toBe('test1');
  }));
});
