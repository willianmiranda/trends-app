import { DemoAppPage } from './app.po';

describe('demo-app App', () => {
  let page: DemoAppPage;

  beforeEach(() => {
    page = new DemoAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
