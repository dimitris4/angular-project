import {browser, element, by} from 'protractor';

describe('Posts section', () => {
  const n = 3; // number of posts we want to add / delete

  // Login before all tests
  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('/login');
    await element(by.id('e2e-email')).sendKeys('dimi@gmail.com');
    await element(by.id('e2e-password')).sendKeys('123456');
    await element(by.id('e2e-login-button')).click();
    // browser must wait until the call to the API is made and current user is stored.
    await browser.sleep(1000);
  });

  // navigate to the Posts page before each test
  beforeEach(async () => {
    await browser.get('/home/posts'); // reload your SPA
    await browser.sleep(1000);
  });

  it('Create new post', async () => {
    const postsBeforeAdding: number = await (await element.all(by.id('e2e-post-title'))).length;
    let postsAfterAdding: number;
    for (let i = 0; i < n; i++) {
      await element(by.css('.e2e-new')).click();
      await element(by.id('e2e-new-post-title')).sendKeys('Is there life out there?');
      await element(by.id('e2e-new-post-text')).sendKeys('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');
      await element(by.id('submit_button')).click();
      // must wait because it calls the API
      await browser.sleep(1000);
      postsAfterAdding = await (await element.all(by.id('e2e-post-title'))).length;
    }
    expect(postsAfterAdding).toEqual(postsBeforeAdding + n);
  });

  // update post

  // delete post
  it('Delete post', async () => {
    const postsBeforeDeleting: number = await (await element.all(by.id('e2e-post-title'))).length;
    let postsAfterDeleting: number;
    for (let i = 0; i < n; i++) {
      await element.all(by.id('e2e-edit-post-button')).get(postsBeforeDeleting - i - 1).click();
      await element(by.id('delete_button')).click();
      await element(by.id('e2e-confirm-delete')).click();
      await browser.sleep(1000);
      postsAfterDeleting = await (await element.all(by.id('e2e-post-title'))).length;
    }
    expect(postsAfterDeleting).toEqual(postsBeforeDeleting - n);
  });
});
