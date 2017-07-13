import { TireloPage } from './app.po';

describe('tirelo App', function() {
  let page: TireloPage;

  beforeEach(() => {
    page = new TireloPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
