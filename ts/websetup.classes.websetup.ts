import * as plugins from './websetup.plugins';
import * as interfaces from './interfaces';
import { TagManager } from './websetup.classes.tagmanager';
import { TagLevel } from './websetup.classes.taglevel';

export interface IWebSetupConstructorOptions {
  metaObject: interfaces.IMetaObject;
  smartssrWaitForReadySignal?: boolean;
}

/**
 * the main WebSetup class
 */
export class WebSetup {
  public tagManager: TagManager = new TagManager();
  public options: IWebSetupConstructorOptions;
  
  // private deferreds
  private readyDeferred = plugins.smartpromise.defer();
  private readyForSmartssrDeferred = plugins.smartpromise.defer();

  // public promises
  public readyPromise = this.readyDeferred.promise;
  public readyForSmartssrPromise = this.readyForSmartssrDeferred.promise;
  constructor(optionsArg: IWebSetupConstructorOptions) {
    this.options = optionsArg;
    this.setup().then(() => {
      this.readyDeferred.resolve();
      if (!this.options.smartssrWaitForReadySignal) {
        this.readyForSmartssrDeferred.resolve();
      }
    });
  }

  /**
   * an async setup called by the constructor
   */
  public async setup(optionsArg?: IWebSetupConstructorOptions) {
    if (optionsArg) {
      this.options = optionsArg;
    }
    await this.tagManager.setup(this.options.metaObject);
  }

  /**
   * reverts the active level and returns to the base level
   */
  public revertToBaseLevel() {
    this.tagManager.revertToBaseLevel();
  }

  /**
   * sets a subpage
   * @param metaObjectArg
   */
  public async setSubLevel(metaObjectArg: interfaces.IMetaObject) {
    const subLevel = await this.tagManager.setSubPageLevel(metaObjectArg);
    return subLevel;
  }

  /**
   * flashes the title with the given text
   * @param flashTextArg
   */
  public flashTitle(flashTextArg: string) {}

  /**
   * informs smartssr that the page is ready to be rendered
   */
  public informReadyForSmartssr() {
    if (!this.options.smartssrWaitForReadySignal) {
      console.error(`You have not indicated that you inform smartssr by a dedicated signal! Please consider doing so!`);
    }
    this.readyForSmartssrDeferred.resolve();
  }
}
