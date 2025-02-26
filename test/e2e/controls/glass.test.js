/* global fixture, test */

import {
  TARGET_TYPE
} from '../../../src/konstants';

import Page from './page';

const page = new Page(TARGET_TYPE.GLASS);

fixture`Control Type Glass`.page`../pages/control-glass.html`;

test('Searching', async (t) => {
  await t
    .click(page.button)
    .expect(page.control.hasClass(page.klasses.expanded))
    .ok()
    .typeText(page.input, 'New York')
    .expect(page.input.value)
    .eql('New York')
    .pressKey('enter')
    .expect(page.result.childElementCount)
    .gt(1);
});