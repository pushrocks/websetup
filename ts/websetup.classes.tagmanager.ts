import { TagLevel } from './websetup.classes.taglevel';
import * as plugins from './websetup.plugins';
import * as interfaces from './interfaces';
import { MetaTag } from './websetup.classes.tag.metatag';
import { JsonLdTag } from './websetup.classes.tag.jsonldtag';
import { OpengraphTag } from './websetup.classes.tag.opengraphtag';

export class TagManager {
  public globalLevel: TagLevel = new TagLevel(this, 'global');

  public baseLevel: TagLevel = new TagLevel(this, 'base');

  public activeLevel: TagLevel;

  public async setup(metaObjectArg: interfaces.IMetaObject) {
    // global tag level
    this.globalLevel.addTag(new MetaTag('google', 'notranslate'));
    this.globalLevel.addTag(new MetaTag('revisit-after', '1 days'));

    if (metaObjectArg.twitterHandle) {
      this.globalLevel.addTag(new MetaTag('twitter:card', 'summary_large_image'));
      this.globalLevel.addTag(new MetaTag('twitter:site', metaObjectArg.twitterHandle));
      this.globalLevel.addTag(new MetaTag('twitter:creator', metaObjectArg.twitterHandle));
    }

    // base tag level
    this.baseLevel.title = metaObjectArg.title;
    if (metaObjectArg.description) {
      this.baseLevel.addTag(new MetaTag('description', metaObjectArg.description));
    }

    if (metaObjectArg.canonicalDomain) {
      this.baseLevel.addTag(new MetaTag('canonical', metaObjectArg.canonicalDomain));
    }

    if (metaObjectArg.ldCompany) {
      this.baseLevel.addCompanyInfo(metaObjectArg.ldCompany);
    }
    await this.globalLevel.enable();
    this.activeLevel = this.baseLevel;
    await this.activeLevel.enable();
  }

  public async setSubPageLevel(metaObjectArg: interfaces.IMetaObject) {
    const subPageLevel = new TagLevel(this, 'subpage');
    subPageLevel.title = metaObjectArg.title;
    if (metaObjectArg.description) {
      subPageLevel.addTag(new MetaTag('description', metaObjectArg.description));
    }
    await this.activeLevel.disable();
    this.activeLevel = subPageLevel;
    await this.activeLevel.enable();
    return subPageLevel;
  }

  public async revertToBaseLevel() {
    if (this.activeLevel !== this.baseLevel) {
      await this.activeLevel.disable();
      this.activeLevel = this.baseLevel;
      await this.activeLevel.enable();
    }
  }
}
