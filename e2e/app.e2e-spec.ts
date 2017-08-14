import { NgFrizerPage } from './app.po';

describe('ng-frizer App', () => {
  let page: NgFrizerPage;

  beforeEach(() => {
    page = new NgFrizerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
