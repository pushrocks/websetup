import * as plugins from './websetup.plugins';
import { IMetaObject, setupMetaInformation } from './meta';

export interface IWebSetupConstructorOptions {
  metaObject: IMetaObject;
}

/**
 * the main WebSetup class
 */
export class WebSetup {
  public options: IWebSetupConstructorOptions;
  constructor(optionsArg: IWebSetupConstructorOptions) {
    this.options = optionsArg;
  }

  public async setup() {
    await setupMetaInformation(this.options.metaObject);
  }
}
