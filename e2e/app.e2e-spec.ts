import { GameoflifePage } from './app.po';

describe('gameoflife App', () => {
  let page: GameoflifePage;

  beforeEach(() => {
    page = new GameoflifePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
