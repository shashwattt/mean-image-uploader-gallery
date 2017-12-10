import { MeanProjectPage } from './app.po';

describe('mean-project App', function() {
  let page: MeanProjectPage;

  beforeEach(() => {
    page = new MeanProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
