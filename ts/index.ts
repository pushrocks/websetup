import * as plugins from './websetup.plugins';

import { setupGoogleAnalytics } from './tools/ganalytics';
import { setupFullStory } from './tools/fullstory';
import { IMetaObject, setupMetaInformation } from './meta';

export interface IWebSetupConstructorOptions {
  googleAnalyticsCode?: string;
  fsCode?: string;
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

    if (this.options.googleAnalyticsCode) {
      await setupGoogleAnalytics(this.options.googleAnalyticsCode);
    }

    if (this.options.fsCode) {
      await setupFullStory(this.options.fsCode);
    }
  }
}
