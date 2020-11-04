import { Tag } from "./websetup.classes.tag";

export class MetaTag extends Tag {
  constructor(metaNameArg: string, contentArg: string) {
    super();
    const metaElement = document.createElement('meta');
    metaElement.name = metaNameArg;
    metaElement.content = contentArg;
    this.elementRef = metaElement;
  }
}