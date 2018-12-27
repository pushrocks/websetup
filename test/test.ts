import { expect, tap } from '@pushrocks/tapbundle';
import * as websetup from '../ts/index'

tap.test('first test', async () => {
  console.log(websetup.standardExport)
})

tap.start()
