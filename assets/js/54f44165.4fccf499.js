(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{110:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return b}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),p=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=p(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,b=u["".concat(i,".").concat(d)]||u[d]||f[d]||o;return n?a.a.createElement(b,c(c({ref:t},s),{},{components:n})):a.a.createElement(b,c({ref:t},s))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var s=2;s<o;s++)i[s]=n[s];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},86:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return p}));var r=n(3),a=n(7),o=(n(0),n(110)),i={title:"Installation",sidebar_label:"Installation",slug:"/"},c={unversionedId:"getting-started/installation",id:"getting-started/installation",isDocsHomePage:!1,title:"Installation",description:"Meet Type FS",source:"@site/docs/getting-started/installation.md",slug:"/",permalink:"/typefs/docs/",editUrl:"https://github.com/daniel-samson/typefs/edit/documentation/docs/getting-started/installation.md",version:"current",sidebar_label:"Installation",sidebar:"docs",next:{title:"Config",permalink:"/typefs/docs/api/config"}},l=[{value:"Meet Type FS",id:"meet-type-fs",children:[]},{value:"Why Type FS",id:"why-type-fs",children:[]},{value:"Setting up your environment",id:"setting-up-your-environment",children:[{value:"Installation",id:"installation",children:[]},{value:"Configure",id:"configure",children:[]},{value:"Usage Example",id:"usage-example",children:[]}]}],s={toc:l};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"meet-type-fs"},"Meet Type FS"),Object(o.b)("p",null,"A file storage package that provides a single interface to many types of filesystems. "),Object(o.b)("h2",{id:"why-type-fs"},"Why Type FS"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Restrict access to directories in your filesystem."),Object(o.b)("li",{parentName:"ul"},"You only have to learn one set of methods for each type of storage."),Object(o.b)("li",{parentName:"ul"},"Can be configured via environment variables to change the storage configuration."),Object(o.b)("li",{parentName:"ul"},"Can be configured useing JSON or JavaScript")),Object(o.b)("h2",{id:"setting-up-your-environment"},"Setting up your environment"),Object(o.b)("h3",{id:"installation"},"Installation"),Object(o.b)("p",null,"Install type fs using npm:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"npm install typefs\n")),Object(o.b)("h3",{id:"configure"},"Configure"),Object(o.b)("p",null,"Type FS has the concept disks, which lets you configure many directory locations and which driver to use. You can configure the Storage manager by editing your project's entry file:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"// index.ts\nimport { Storage, Configuration } from 'typefs;\n\nStorage.config: Configuration = {\n    default: 'assets',\n    disks: {\n        app: {\n            driver: 'file',\n            root: '/app/',\n            jail: true,\n        }\n        assets: {\n            driver: 'file',\n            root: '/app/public/assets/'\n            jail: true,\n        }\n    }\n}\n")),Object(o.b)("h3",{id:"usage-example"},"Usage Example"),Object(o.b)("p",null,"Use the storage manager to manipulate your disks:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"import { Storage } from 'typefs;\n\nasync function doFoo() {\n    const path = 'file.txt';\n    const content = Buffer.from('hello world');\n    await Storage.disk('assets').write(path, content);\n}\n")))}p.isMDXComponent=!0}}]);