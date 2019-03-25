import * as plugins from './websetup.plugins';

import { setupGoogleAnalytics } from './tools/ganalytics';
import { setupFullStory } from './tools/fullstory';

export interface IWebSetupConstructorOptions {
  googleAnalyticsCode?: string;
  fsCode?: string;
}

/**
 * the main WebSetup class
 */
export class WebSetup {
  constructor(optionsArg: IWebSetupConstructorOptions) {
    if (optionsArg.googleAnalyticsCode) {
      setupGoogleAnalytics(optionsArg.googleAnalyticsCode);
    }

    if (optionsArg.fsCode) {
      setupFullStory(optionsArg.fsCode)
    }
  }
}