import * as plugins from './websetup.plugins';

import { setupGoogleAnalytics } from './tools/ganalytics';
import { setupFullStory } from './tools/fullstory';
import { setupServiceWoker } from './serviceworker';
import { IMetaObject, setupMetaInformation } from './meta';

export interface IWebSetupConstructorOptions {
  googleAnalyticsCode?: string;
  fsCode?: string;
  metaObject: IMetaObject;
  serviceworker?: boolean;
}

/**
 * the main WebSetup class
 */
export class WebSetup {
  constructor(optionsArg: IWebSetupConstructorOptions) {
    // most important, lets get the meta information in place
    this.setup(optionsArg);
  }

  async setup(optionsArg: IWebSetupConstructorOptions) {
    if (optionsArg.serviceworker) {
      await setupServiceWoker();
    }

    if (optionsArg.googleAnalyticsCode) {
      await setupGoogleAnalytics(optionsArg.googleAnalyticsCode);
    }

    if (optionsArg.fsCode) {
      await setupFullStory(optionsArg.fsCode);
    }
  }
}
