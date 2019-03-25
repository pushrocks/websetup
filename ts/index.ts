import * as plugins from './websetup.plugins';

import { setupGoogleAnalytics } from './tools/ganalytics';

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

    if () {

    }
  }
}