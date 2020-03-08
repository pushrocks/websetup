var tsbundle=function(t){"use strict";const e=async(t,e)=>{const n=document.createElement("meta");n.name=t,n.content=e,document.getElementsByTagName("head")[0].appendChild(n)},n=async(t,e)=>{const n=document.querySelector("link[rel='canonical']")?document.querySelector("link[rel='canonical']"):document.createElement("link");return n.setAttribute("rel",t),n.setAttribute("href",e),document.head.appendChild(n),n},a=async(t,e)=>{const n=document.createElement("meta");return n.setAttribute("property",t),n.content=e,document.getElementsByTagName("head")[0].appendChild(n),n},o=async t=>{const e=[],n={"@context":"https://schema.org","@type":"Corporation",name:t.name,alternateName:t.name.replace(" GmbH",""),url:t.contact.website,logo:t.contact.logoUrl,contactPoint:{"@type":"ContactPoint",telephone:t.contact.phone,contactType:"customer service",areaServed:"DE",availableLanguage:["en","German"]},sameAs:[]};t.contact.facebookUrl&&n.sameAs.push(t.contact.facebookUrl),t.contact.twitterUrl&&n.sameAs.push(t.contact.twitterUrl);const o=document.createElement("script");return o.type="application/ld+json",o.text=JSON.stringify(n),document.querySelector("head").appendChild(o),e.push(o),e.push(await a("og:type","business.business")),e.push(await a("og:title",t.name)),e.push(await a("og:url",t.contact.website)),e.push(await a("og:image",t.contact.logoUrl)),e.push(await a("business:contact_data:street_address",`${t.contact.address.streetName} ${t.contact.address.houseNumber}`)),e.push(await a("business:contact_data:locality",t.contact.address.postalCode)),e.push(await a("business:contact_data:region",t.contact.address.city)),e.push(await a("business:contact_data:postal_code",t.contact.address.postalCode)),e.push(await a("business:contact_data:country_name",t.contact.address.country)),e};return t.WebSetup=class{constructor(t){this.options=t}async setup(){await(async t=>{document.title=t.title,e("description",t.description),e("google","notranslate"),e("revisit-after","1 days"),t.canonicalDomain&&n("canonical",t.canonicalDomain),t.ldCompany&&o(t.ldCompany)})(this.options.metaObject),this.options.googleAnalyticsCode&&await(async t=>{var e,n,a,o,s,c;e=window,n=document,a="script",o="analytics",e.GoogleAnalyticsObject=o,e[o]=e[o]||function(){(e[o].q=e[o].q||[]).push(arguments)},e[o].l=(new Date).getTime(),s=n.createElement(a),c=n.getElementsByTagName(a)[0],s.async=1,s.src="//www.google-analytics.com/analytics.js",s.crossorigin="anonymous",c.parentNode.insertBefore(s,c),window.analytics("create",t,"auto"),window.analytics("send","pageview"),console.log("Loaded Google Analytics. You may view our privacy policy at https://lossless.gmbh")})(this.options.googleAnalyticsCode),this.options.fsCode&&await(async t=>{var e,n,a,o,s,c,i,r;window._fs_debug=!1,window._fs_host="fullstory.com",window._fs_org=t,window._fs_namespace="FS",e=window,n=document,a=window._fs_namespace,o="script",s="user",a in e?e.console&&e.console.log&&e.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'):((i=e[a]=function(t,e,n){i.q?i.q.push([t,e,n]):i._api(t,e,n)}).q=[],(c=n.createElement(o)).async=1,c.src="https://"+window._fs_host+"/s/fs.js",c.crossorigin="anonymous",(r=n.getElementsByTagName(o)[0]).parentNode.insertBefore(c,r),i.identify=function(t,e,n){i(s,{uid:t},n),e&&i(s,e,n)},i.setUserVars=function(t,e){i(s,t,e)},i.event=function(t,e,n){i("event",{n:t,p:e},n)},i.shutdown=function(){i("rec",!1)},i.restart=function(){i("rec",!0)},i.consent=function(t){i("consent",!arguments.length||t)},i.identifyAccount=function(t,e){c="account",(e=e||{}).acctId=t,i(c,e)},i.clearUserCookie=function(){})})(this.options.fsCode)}},t}({});
//# sourceMappingURL=bundle.js.map
