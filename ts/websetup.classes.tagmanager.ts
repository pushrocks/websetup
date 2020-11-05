import { TagLevel } from './websetup.classes.taglevel';
import * as plugins from './websetup.plugins';
import * as interfaces from './interfaces';
import { MetaTag } from './websetup.classes.tag.metatag';
import { JsonLdTag } from './websetup.classes.tag.jsonldtag';
import { OpengraphTag } from './websetup.classes.tag.opengraphtag';

export class TagManager {
  public globalLevel: TagLevel;

  public baseLevel: TagLevel;

  public activeLevel: TagLevel;

  public async setup(metaObjectArg: interfaces.IMetaObject) {
    // global tag level
    this.globalLevel = new TagLevel(this, 'global');
    this.globalLevel.addTag(new MetaTag('google', 'notranslate'));
    this.globalLevel.addTag(new MetaTag('revisit-after', '1 days'));

    // base tag level
    this.baseLevel = new TagLevel(this, 'base');
    this.baseLevel.title = metaObjectArg.title;
    this.baseLevel.addTag(new MetaTag('description', metaObjectArg.description));

    if (metaObjectArg.canonicalDomain) {
      this.baseLevel.addTag(new MetaTag('canonical', metaObjectArg.canonicalDomain));
    }

    if (metaObjectArg.ldCompany) {
      this.baseLevel.addCompanyInfo(metaObjectArg.ldCompany);
    }
    await this.globalLevel.enable();
    await this.baseLevel.enable();
  }

  public setSubPageLevel(metaObjectArg: interfaces.IMetaObject) {
    const subPageLevel = new TagLevel(this, 'subpage');
    subPageLevel.title = metaObjectArg.title;
    subPageLevel.addTag(new MetaTag('description', metaObjectArg.description));
    this.activeLevel.disable();
    this.activeLevel = subPageLevel;
    this.activeLevel.enable();
    return subPageLevel;
  }

  public revertToBaseLevel() {
    if (this.activeLevel !== this.baseLevel) {
      this.activeLevel.disable();
      this.activeLevel = this.baseLevel;
      this.activeLevel.enable();
    }
  }
}
