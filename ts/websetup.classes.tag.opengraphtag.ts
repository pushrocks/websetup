import { Tag } from './websetup.classes.tag';

export class OpengraphTag extends Tag {
  constructor(propertyNameArg: string, contentArg: string) {
    super();
    const openGraphElement = document.createElement('meta');
    openGraphElement.setAttribute('property', propertyNameArg);
    openGraphElement.content = contentArg;
    this.elementRef = openGraphElement;
  }
}
