/* global Buffer, fixture, process, test */

import '../../env';
import {
  PROVIDERS,
} from '../../../src/konstants';

import Page from './page';

const page = new Page();
const key = Buffer.from(process.env.KEY_BING, 'base64').toString('ascii');

fixture`Bing`.page`../pages/providers.html`;

test('Searching', async (t) => {
  await t
    .typeText(page.provider, PROVIDERS.BING)
    .expect(page.provider.value)
    .eql(PROVIDERS.BING)
    .typeText(page.key, key)
    .expect(page.key.value)
    .eql(key)
    .typeText(page.input, 'New York')
    .expect(page.input.value)
    .eql('New York')
    .pressKey('enter')
    // .debug()
    .expect(page.result.childElementCount)
    .gt(1);
});