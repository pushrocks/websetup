import * as plugins from './websetup.plugins';
import * as interfaces from './interfaces';
import { TagManager } from './websetup.classes.tagmanager';
import { TagLevel } from './websetup.classes.taglevel';

export interface IWebSetupConstructorOptions {
  metaObject: interfaces.IMetaObject;
}

/**
 * the main WebSetup class
 */
export class WebSetup {
  public tagManager: TagManager = new TagManager();
  public options: IWebSetupConstructorOptions;
  private readyDeferred = plugins.smartpromise.defer();
  public readyPromise = this.readyDeferred.promise;
  constructor(optionsArg: IWebSetupConstructorOptions) {
    this.options = optionsArg;
    this.setup().then(() => {
      this.readyDeferred.resolve();
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

  public flashTitle(flashTextArg: string) {}
}
