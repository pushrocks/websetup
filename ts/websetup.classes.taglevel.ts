import { Tag } from './websetup.classes.tag';
import { JsonLdTag } from './websetup.classes.tag.jsonldtag';
import { OpengraphTag } from './websetup.classes.tag.opengraphtag';
import { TagManager } from './websetup.classes.tagmanager';
import * as plugins from './websetup.plugins';

export type TBaseLevelType = 'global' | 'base' | 'subpage';

export type TLevelState = 'enabled' | 'disabled';

export class TagLevel {
  public tagManagerRef: TagManager;

  private titleStore: string;
  public set title(titleArg: string) {
    this.titleStore = titleArg;
    if (this.state === 'enabled') {
      document.title = this.titleStore;
    }
  }
  public get title() {
    return this.titleStore;
  }

  public type: TBaseLevelType;
  public tags: Tag[] = [];

  public state: TLevelState = 'disabled';

  constructor(tagManagerRefArg: TagManager, levelType: TBaseLevelType) {
    this.tagManagerRef = tagManagerRefArg;
  }

  public addTag(tagArg: Tag) {
    this.tags.push(tagArg);
    if (this.state === 'enabled') {
      tagArg.appendToDom();
    }
  }

  public async addCompanyInfo(companyDataArg: plugins.tsclass.business.ICompany) {
    this.addTag(JsonLdTag.createCompanyLd(companyDataArg));

    // lets care about open graph
    this.addTag(new OpengraphTag('og:type', 'business.business'));
    this.addTag(new OpengraphTag('og:title', companyDataArg.name));
    this.addTag(new OpengraphTag('og:url', companyDataArg.contact.website));
    this.addTag(new OpengraphTag('og:image', companyDataArg.contact.logoUrl));
    this.addTag(
      new OpengraphTag(
        'business:contact_data:street_address',
        `${companyDataArg.contact.address.streetName} ${companyDataArg.contact.address.houseNumber}`
      )
    );
    this.addTag(
      new OpengraphTag('business:contact_data:locality', companyDataArg.contact.address.postalCode)
    );
    this.addTag(
      new OpengraphTag('business:contact_data:region', companyDataArg.contact.address.city)
    );
    this.addTag(
      new OpengraphTag(
        'business:contact_data:postal_code',
        companyDataArg.contact.address.postalCode
      )
    );
    this.addTag(
      new OpengraphTag('business:contact_data:country_name', companyDataArg.contact.address.country)
    );
  }

  public addNewsArticleInfo(articleArg: plugins.tsclass.content.IArticle) {
    this.addTag(JsonLdTag.createNewsArticleLd(articleArg));
  }

  public async enable() {
    if (this.title) {
      document.title = this.title;
    }
    for (const tagArg of this.tags) {
      tagArg.appendToDom();
    }
    this.state = 'enabled';
  }

  public async disable() {
    for (const tagArg of this.tags) {
      tagArg.removeFromDom();
    }
    this.state = 'disabled';
  }
}
