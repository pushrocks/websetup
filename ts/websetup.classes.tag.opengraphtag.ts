import * as plugins from './websetup.plugins';
import { Tag } from './websetup.classes.tag';

export class OpengraphTag extends Tag {
  public static createNewsArticleOgTags(newsArticleArg: plugins.tsclass.content.IArticle) {
    const tagArray: OpengraphTag[] = [];
    tagArray.push(new OpengraphTag('og:url', newsArticleArg.url));
    tagArray.push(new OpengraphTag('og:title', newsArticleArg.title));
    tagArray.push(new OpengraphTag('og:description', newsArticleArg.content));
    tagArray.push(new OpengraphTag('og:image', newsArticleArg.featuredImageUrl));
    return tagArray;
  }

  constructor(propertyNameArg: string, contentArg: string) {
    super();
    const openGraphElement = document.createElement('meta');
    openGraphElement.setAttribute('property', propertyNameArg);
    openGraphElement.content = contentArg;
    this.elementRef = openGraphElement;
  }
}
