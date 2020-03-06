declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    _fs_debug: boolean;
    _fs_host: any;
    _fs_org: string;
    _fs_namespace: string;
  }
}
export const setupFullStory = async (fsCodeArg: string) => {
  // tslint:disable-next-line: no-string-literal
  window['_fs_debug'] = false;
  // tslint:disable-next-line: no-string-literal
  window['_fs_host'] = 'fullstory.com';
  // tslint:disable-next-line: no-string-literal
  window['_fs_org'] = fsCodeArg;
  // tslint:disable-next-line: no-string-literal
  window['_fs_namespace'] = 'FS';
  ((m, n, e, t, l, o, g, y) => {
    if (e in m) {
      if (m.console && m.console.log) {
        m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');
      }
      return;
    }
    // tslint:disable-next-line: only-arrow-functions
    g = m[e] = function(a, b, s) {
      g.q ? g.q.push([a, b, s]) : g._api(a, b, s);
    };
    g.q = [];
    o = n.createElement(t);
    o.async = 1;
    o.src = 'https://' + window._fs_host + '/s/fs.js';
    o.crossorigin = 'anonymous';
    y = n.getElementsByTagName(t)[0];
    y.parentNode.insertBefore(o, y);
    // tslint:disable-next-line: only-arrow-functions
    g.identify = function(i, v, s) {
      g(l, { uid: i }, s);
      if (v) g(l, v, s);
    };
    g.setUserVars = function(v, s) {
      g(l, v, s);
    };
    g.event = function(i, v, s) {
      g('event', { n: i, p: v }, s);
    };
    // tslint:disable-next-line: only-arrow-functions
    g.shutdown = function() {
      g('rec', !1);
    };
    g.restart = function() {
      g('rec', !0);
    };
    // tslint:disable-next-line: only-arrow-functions
    g.consent = function(a) {
      g('consent', !arguments.length || a);
    };
    // tslint:disable-next-line: only-arrow-functions
    g.identifyAccount = function(i, v) {
      o = 'account';
      v = v || {};
      v.acctId = i;
      g(o, v);
    };
    // tslint:disable-next-line: only-arrow-functions
    g.clearUserCookie = function() {};
    // tslint:disable-next-line: no-string-literal
  })(window, document, window['_fs_namespace'], 'script', 'user');
};
