declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    analytics: any;
  }
}

export const setupGoogleAnalytics = async (gaCode: string) => {
  // tslint:disable-next-line: only-arrow-functions
  (function(i, s, o, g, r, a, m) {
    // tslint:disable-next-line: no-string-literal
    i['GoogleAnalyticsObject'] = r;
    // tslint:disable-next-line: ban-comma-operator
    (i[r] =
      i[r] ||
      // tslint:disable-next-line: only-arrow-functions
      function() {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = new Date().getTime());
    // tslint:disable-next-line: ban-comma-operator
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    a.crossorigin = 'anonymous';
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'analytics');

  window.analytics('create', gaCode, 'auto');
  window.analytics('send', 'pageview');
  console.log('Loaded Google Analytics. You may view our privacy policy at https://lossless.gmbh');
};
