(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{108:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return p}));var r=a(3),l=a(0),n=a.n(l),c=a(119),o=a(125),s=a(121),i=a(16),m=a(123),u=a(109),f=a.n(u),d=[{title:"Easy Automation",imageUrl:"",description:n.a.createElement(n.a.Fragment,null,"Write automation scripts to files in many storage locations.")},{title:"Supports Mutliple Protocols",imageUrl:"",description:n.a.createElement(n.a.Fragment,null,"Manipilate files across file://, s3:// etc.")},{title:"Secure your web application",imageUrl:"",description:n.a.createElement(n.a.Fragment,null,"Use jails to restrict access to directories in your filesystem.")}];function E(e){var t=e.imageUrl,a=e.title,r=e.description,l=Object(m.a)(t);return n.a.createElement("div",{className:Object(c.a)("col col--4",f.a.feature)},l&&n.a.createElement("div",{className:"text--center"},n.a.createElement("img",{className:f.a.featureImage,src:l,alt:a})),n.a.createElement("h3",null,a),n.a.createElement("p",null,r))}function p(){var e=Object(i.default)().siteConfig,t=void 0===e?{}:e;return n.a.createElement(o.a,{title:"Hello from "+t.title,description:"The single way to manipulate files in NodeJS/TypeScript"},n.a.createElement("header",{className:Object(c.a)("hero hero--primary",f.a.heroBanner)},n.a.createElement("div",{className:"container"},n.a.createElement("img",{width:"64px",src:"img/logo.svg"}),n.a.createElement("p",{className:"hero__subtitle"},t.tagline),n.a.createElement("div",{className:f.a.buttons},n.a.createElement(s.a,{className:Object(c.a)("button button--outline button--secondary button--lg",f.a.getStarted),to:Object(m.a)("docs/")},"Get Started")))),n.a.createElement("main",null,d&&d.length>0&&n.a.createElement("section",{className:f.a.features},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},d.map((function(e,t){return n.a.createElement(E,Object(r.a)({key:t},e))})))))))}},127:function(e,t,a){"use strict";var r=a(3),l=a(7),n=a(0),c=a.n(n),o=a(119),s=a(121),i=a(120),m=a(123),u=a(56),f=a.n(u),d=a(124);function E(e){var t=e.to,a=e.href,n=e.label,o=e.prependBaseUrlToHref,i=Object(l.a)(e,["to","href","label","prependBaseUrlToHref"]),u=Object(m.a)(t),f=Object(m.a)(a,{forcePrependBaseUrl:!0});return c.a.createElement(s.a,Object(r.a)({className:"footer__link-item"},a?{href:o?f:a}:{to:u},i),n)}var p=function(e){var t=e.sources,a=e.alt;return c.a.createElement(d.a,{className:"footer__logo",alt:a,sources:t})};t.a=function(){var e=Object(i.useThemeConfig)().footer,t=e||{},a=t.copyright,r=t.links,l=void 0===r?[]:r,n=t.logo,u=void 0===n?{}:n,d={light:Object(m.a)(u.src),dark:Object(m.a)(u.srcDark||u.src)};return e?c.a.createElement("footer",{className:Object(o.a)("footer",{"footer--dark":"dark"===e.style})},c.a.createElement("div",{className:"container"},l&&l.length>0&&c.a.createElement("div",{className:"row footer__links"},l.map((function(e,t){return c.a.createElement("div",{key:t,className:"col footer__col"},null!=e.title?c.a.createElement("h4",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?c.a.createElement("ul",{className:"footer__items"},e.items.map((function(e,t){return e.html?c.a.createElement("li",{key:t,className:"footer__item",dangerouslySetInnerHTML:{__html:e.html}}):c.a.createElement("li",{key:e.href||e.to,className:"footer__item"},c.a.createElement(E,e))}))):null)}))),(u||a)&&c.a.createElement("div",{className:"footer__bottom text--center"},u&&(u.src||u.srcDark)&&c.a.createElement("div",{className:"margin-bottom--sm"},u.href?c.a.createElement(s.a,{href:u.href,className:f.a.footerLogoLink},c.a.createElement(p,{alt:u.alt,sources:d})):c.a.createElement(p,{alt:u.alt,sources:d})),a?c.a.createElement("div",{className:"footer__copyright",dangerouslySetInnerHTML:{__html:a}}):null))):null}}}]);