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
  addMetaTag('revisited-after', '1 days');
  metaObjectArg.canonicalDomain ? addLinkTag('canonical', metaObjectArg.canonicalDomain) : null;

  if (metaObjectArg.ldCompany) {
    addCompanyJsonLD(metaObjectArg.ldCompany)
  }
};

const addMetaTag = async (linkNameArg: string, contentArg: string) => {
  const metaElement = document.createElement('meta');
  metaElement.name = linkNameArg;
  metaElement.content = contentArg;
  document.getElementsByTagName('head')[0].appendChild(metaElement);
};

const addLinkTag = async (relArg, hrefArg) => {
  const link = !!document.querySelector("link[rel='canonical']")
    ? document.querySelector("link[rel='canonical']")
    : document.createElement('link');
  link.setAttribute('rel', relArg);
  link.setAttribute('href', hrefArg);
  document.head.appendChild(link);
};

const addCompanyJsonLD = async (companyDataArg: plugins.tsclass.business.ICompany) => {
  const companyLd = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": companyDataArg.name,
    "alternateName": companyDataArg.name.replace(' GmbH', ''),
    "url": companyDataArg.contact.website,
    "logo": companyDataArg.contact.logoUrl,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": companyDataArg.contact.phone,
      "contactType": "customer service",
      "areaServed": "DE",
      "availableLanguage": ["en","German"]
    },
    "sameAs": []
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
};
