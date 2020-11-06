import * as plugins from '../websetup.plugins';

export interface IMetaObject {
  title: string;
  description?: string;
  twitterHandle?: string;
  canonicalDomain?: string;
  ldCompany?: plugins.tsclass.business.ICompany;
  ldProduct?: any;
}
