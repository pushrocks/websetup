export interface IMetaObject {
  title: string;
  description: string;
}

export const setupMetaInformation = async (metaObjectArg: IMetaObject) => {
  document.title = metaObjectArg.title;
  addMetaTag('description', metaObjectArg.description);
  addMetaTag('google', 'notranslate');
  addMetaTag('revisited-after', '1 days');
};

const addMetaTag = async (linkNameArg: string, contentArg: string) => {
  const metaElement = document.createElement('meta');
  metaElement.name = linkNameArg;
  metaElement.content = contentArg;
  document.getElementsByTagName('head')[0].appendChild(metaElement);
};
