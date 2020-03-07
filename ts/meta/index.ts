import * as plugins from '../websetup.plugins';

export interface IMetaObject {
  title: string;
  description: string;
  canonicalDomain?: string;
  ldCompany?: plugins.tsclass.business.ICompany;
  ldProduct?: any;
}

export const setupMetaInformation = async (metaObjectArg: IMetaObject) => {
  document.title = metaObjectArg.title;
  addMetaTag('description', metaObjectArg.description);
  addMetaTag('google', 'notranslate');
  addMetaTag('revisit-after', '1 days');
  metaObjectArg.canonicalDomain ? addLinkTag('canonical', metaObjectArg.canonicalDomain) : null;

  if (metaObjectArg.ldCompany) {
    addCompanyInfo(metaObjectArg.ldCompany);
  }
};

const addMetaTag = async (metaNameArg: string, contentArg: string) => {
  const metaElement = document.createElement('meta');
  metaElement.name = metaNameArg;
  metaElement.content = contentArg;
  document.getElementsByTagName('head')[0].appendChild(metaElement);
};

const addLinkTag = async (relArg, hrefArg): Promise<Element> => {
  const link = !!document.querySelector("link[rel='canonical']")
    ? document.querySelector("link[rel='canonical']")
    : document.createElement('link');
  link.setAttribute('rel', relArg);
  link.setAttribute('href', hrefArg);
  document.head.appendChild(link);
  return link;
};

const addOpenGraphProperty = async (
  propertyNameArg: string,
  contentArg: string
): Promise<Element> => {
  const openGraphElement = document.createElement('meta');
  openGraphElement.name = propertyNameArg;
  openGraphElement.content = contentArg;
  document.getElementsByTagName('head')[0].appendChild(openGraphElement);
  return openGraphElement;
};

const addCompanyInfo = async (
  companyDataArg: plugins.tsclass.business.ICompany
): Promise<Element[]> => {
  const returnElementArray: Element[] = [];

  // lets care about linked data
  const companyLd = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    name: companyDataArg.name,
    alternateName: companyDataArg.name.replace(' GmbH', ''),
    url: companyDataArg.contact.website,
    logo: companyDataArg.contact.logoUrl,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: companyDataArg.contact.phone,
      contactType: 'customer service',
      areaServed: 'DE',
      availableLanguage: ['en', 'German']
    },
    sameAs: []
  };

  if (companyDataArg.contact.facebookUrl) {
    companyLd.sameAs.push(companyDataArg.contact.facebookUrl);
  }

  if (companyDataArg.contact.twitterUrl) {
    companyLd.sameAs.push(companyDataArg.contact.twitterUrl);
  }

  const jsonLdElement = document.createElement('script');
  jsonLdElement.type = 'application/ld+json';
  jsonLdElement.text = JSON.stringify(companyLd);
  document.querySelector('head').appendChild(jsonLdElement);
  returnElementArray.push(jsonLdElement);

  // lets care about open graph
  returnElementArray.push(await addOpenGraphProperty('og:type', 'business.business'));
  returnElementArray.push(await addOpenGraphProperty('og:title', companyDataArg.name));
  returnElementArray.push(await addOpenGraphProperty('og:url', companyDataArg.contact.website));
  returnElementArray.push(await addOpenGraphProperty('og:image', companyDataArg.contact.logoUrl));
  returnElementArray.push(
    await addOpenGraphProperty(
      'business:contact_data:street_address',
      `${companyDataArg.contact.address.streetName} ${companyDataArg.contact.address.houseNumber}`
    )
  );
  returnElementArray.push(await addOpenGraphProperty('business:contact_data:locality', companyDataArg.contact.address.postalCode));
  returnElementArray.push(await addOpenGraphProperty('business:contact_data:region', companyDataArg.contact.address.city));
  returnElementArray.push(await addOpenGraphProperty('business:contact_data:postal_code', companyDataArg.contact.address.postalCode));
  returnElementArray.push(await addOpenGraphProperty('business:contact_data:country_name', companyDataArg.contact.address.country));

  return returnElementArray;
};
