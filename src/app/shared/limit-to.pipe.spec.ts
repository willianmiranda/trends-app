import { LimitToPipe } from './limit-to.pipe';

describe('LimitToPipe', () => {

  let pipe;

  beforeEach(() => {
    pipe = new LimitToPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform with custom limit', () => {
    expect(pipe.transform('12345', 3)).toBe('123....');
  });

  it('transform with big input', () => {
    expect(pipe.transform('12345678901')).toBe('1234567890....');
  });

  it('transform with small input', () => {
    expect(pipe.transform('12345')).toBe('12345');
  });

});
