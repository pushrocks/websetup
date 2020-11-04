import * as plugins from './websetup.plugins';

export class Tag {
  public elementRef: Element;

  public tagLevel: 'global' | 'levelbound';

  public appendToDom() {
    if (!this.elementRef.parentElement && !this.elementRef.parentNode) {
      document.getElementsByTagName('head')[0].appendChild(this.elementRef);
    }
  }

  public removeFromDom() {
    if (this.elementRef.parentElement) {
      this.elementRef.parentElement.removeChild(this.elementRef);
    } else if (this.elementRef.parentNode) {
      this.elementRef.parentNode.removeChild(this.elementRef);
    }
  }
}