import { expect, tap } from '@pushrocks/tapbundle';
import * as websetup from '../ts/index';

tap.test('first test', async () => {
  const websetupInstance = new websetup.WebSetup({
    metaObject: {
      description: 'A awesome description',
      title: 'mytitle',
      canonicalDomain: 'lossless.com',
    },
  });
  await websetupInstance.readyPromise;
  expect(document.title).to.equal('mytitle');
});

tap.start();
