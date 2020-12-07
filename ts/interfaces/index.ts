import * as plugins from '../websetup.plugins';

export interface IMetaObject {
  title: string;
  description?: string;
  canonicalDomain?: string;
  ldCompany?: plugins.tsclass.business.ICompany;
  ldProduct?: any;

  // handles
  twitterHandle?: string;
  facebookHandle?: string;

  // links
  companyWebsiteLink?: string;
  googleNewsLink?: string;
  mediumLink?: string;
  slackLink?: string;
  airmeetLink?: string;
}
