import { Tag } from './websetup.classes.tag';

export class LinkTag extends Tag {
  constructor(relArg: string, hrefArg: string) {
    super();
    const linkElement = !!document.querySelector("link[rel='canonical']")
      ? document.querySelector("link[rel='canonical']")
      : document.createElement('link');
    linkElement.setAttribute('rel', relArg);
    linkElement.setAttribute('href', hrefArg);
    this.elementRef = linkElement;
  }
}
