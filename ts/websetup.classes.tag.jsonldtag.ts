import * as plugins from './websetup.plugins';
import * as interfaces from './interfaces';

import { Tag } from './websetup.classes.tag';

export class JsonLdTag extends Tag {
  public static createCompanyLd(companyDataArg: plugins.tsclass.business.ICompany) {
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
        availableLanguage: ['en', 'German'],
      },
      sameAs: [],
    };

    if (companyDataArg.contact.facebookUrl) {
      companyLd.sameAs.push(companyDataArg.contact.facebookUrl);
    }

    if (companyDataArg.contact.twitterUrl) {
      companyLd.sameAs.push(companyDataArg.contact.twitterUrl);
    }

    const ldTag = new JsonLdTag(companyLd);
    return ldTag;
  }

  public static createNewsArticleJsonLd(newsArticleArg: plugins.tsclass.content.IArticle) {
    const newsArticleLd = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': window.location.href,
      },
      headline: 'Article headline',
      image: [newsArticleArg.featuredImageUrl],
      datePublished: new Date(newsArticleArg.timestamp).toISOString(),
      dateModified: new Date(newsArticleArg.timestamp).toISOString(),
      author: {
        '@type': 'Person',
        name: `${newsArticleArg.author.firstName} ${newsArticleArg.author.surName}`,
      },
      publisher: {
        '@type': 'Organization',
        name: newsArticleArg.author.surName, // TODO
        logo: {
          '@type': 'ImageObject',
          url: newsArticleArg.author.surName, // TODO
        },
      },
      description: newsArticleArg.author.firstName,
    };
    const ldTag = new JsonLdTag(newsArticleLd);
    return ldTag;
  }

  constructor(ldObjectArg: any) {
    super();
    const jsonLdElement = document.createElement('script');
    jsonLdElement.type = 'application/ld+json';
    jsonLdElement.text = JSON.stringify(ldObjectArg);
    this.elementRef = jsonLdElement;
  }
}
