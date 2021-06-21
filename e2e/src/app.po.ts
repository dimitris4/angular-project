import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }

  async navigateToPosts(): Promise<void> {
    await element(by.css('.e2e-posts')).click();
  }

  async clickNewPostButton(): Promise<void> {
    await element(by.id('newPostBtn')).click();
  }
}
