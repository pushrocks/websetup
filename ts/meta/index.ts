export interface IMetaObject {
  title: string;
  description: string;
  canonicalDomain?: string;
}

export const setupMetaInformation = async (metaObjectArg: IMetaObject) => {
  document.title = metaObjectArg.title;
  addMetaTag('description', metaObjectArg.description);
  addMetaTag('google', 'notranslate');
  addMetaTag('revisited-after', '1 days');
  metaObjectArg.canonicalDomain ? addLinkTag('canonical', metaObjectArg.canonicalDomain) : null;
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
