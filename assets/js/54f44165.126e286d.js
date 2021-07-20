(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{110:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),p=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=p(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,m=u["".concat(i,".").concat(d)]||u[d]||b[d]||o;return n?r.a.createElement(m,s(s({ref:t},l),{},{components:n})):r.a.createElement(m,s({ref:t},l))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},86:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return p}));var a=n(3),r=n(7),o=(n(0),n(110)),i={title:"Installation",sidebar_label:"Installation",slug:"/"},s={unversionedId:"getting-started/installation",id:"getting-started/installation",isDocsHomePage:!1,title:"Installation",description:"Meet Type FS",source:"@site/docs/getting-started/installation.md",slug:"/",permalink:"/typefs/docs/",editUrl:"https://github.com/daniel-samson/typefs/edit/documentation/docs/getting-started/installation.md",version:"current",sidebar_label:"Installation",sidebar:"docs",next:{title:"Config",permalink:"/typefs/docs/api/config"}},c=[{value:"Meet Type FS",id:"meet-type-fs",children:[]},{value:"Why Type FS",id:"why-type-fs",children:[]},{value:"Setting up your environment",id:"setting-up-your-environment",children:[{value:"Installation",id:"installation",children:[]},{value:"Configuration example",id:"configuration-example",children:[]},{value:"Usage Example",id:"usage-example",children:[]}]}],l={toc:c};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"meet-type-fs"},"Meet Type FS"),Object(o.b)("p",null,"Type FS is a package that provides a single way to access and manipulate many types of storage services. "),Object(o.b)("h2",{id:"why-type-fs"},"Why Type FS"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Keeps your code readable."),Object(o.b)("li",{parentName:"ul"},"Restricts access to directories in your filesystem."),Object(o.b)("li",{parentName:"ul"},"You only have to learn one set of methods for each type of storage."),Object(o.b)("li",{parentName:"ul"},"Prevents vendor lockin"),Object(o.b)("li",{parentName:"ul"},"Supports JSON or JavaScript configuration files."),Object(o.b)("li",{parentName:"ul"},"Can be configured via environment variables to change the storage configuration.")),Object(o.b)("h2",{id:"setting-up-your-environment"},"Setting up your environment"),Object(o.b)("h3",{id:"installation"},"Installation"),Object(o.b)("p",null,"To install type fs into your projects run the following command:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"npm install typefs\n")),Object(o.b)("h3",{id:"configuration-example"},"Configuration example"),Object(o.b)("p",null,"Type FS has a concept called ",Object(o.b)("strong",{parentName:"p"},'"disks"'),", which lets you configure many directory locations with a storage driver. You can configure the ",Object(o.b)("a",{parentName:"p",href:"https://daniel-samson.github.io/typefs/docs/api/storage"},"storage manager")," by editing your project's entry file:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"// index.ts\nimport { Storage, Configuration } from 'typefs;\n\nStorage.config: Configuration = {\n    default: 'assets',\n    disks: {\n        app: {\n            driver: 'file',\n            root: '/app/',\n            jail: true,\n        }\n        assets: {\n            driver: 'file',\n            root: '/app/public/assets/'\n            jail: true,\n        }\n    }\n}\n")),Object(o.b)("div",{className:"admonition admonition-info alert alert--info"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"Type FS also comes with a ",Object(o.b)("a",{parentName:"p",href:"https://daniel-samson.github.io/typefs/docs/api/config"},"config")," method which enables you to store the configuration in a separate file."))),Object(o.b)("h3",{id:"usage-example"},"Usage Example"),Object(o.b)("p",null,"In a project file, use the ",Object(o.b)("a",{parentName:"p",href:"https://daniel-samson.github.io/typefs/docs/api/storage"},"storage manager")," to manipulate your disks:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"import { Storage } from 'typefs;\n\nasync function doFoo() {\n    const path = 'file.txt';\n    const content = Buffer.from('hello world');\n    await Storage.disk('assets').write(path, content);\n}\n")))}p.isMDXComponent=!0}}]);