(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{104:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return u})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return i})),n.d(t,"default",(function(){return p}));var r=n(3),o=n(7),a=(n(0),n(110)),u={title:"Blog Plugin",author:"Fanny Vieira",authorTitle:"Maintainer of Docusaurus",authorURL:"https://github.com/fanny",authorImageURL:"https://github.com/fanny.png",authorTwitter:"fannyvieiira",tags:["blog","docusaurus"]},c={permalink:"/typefs/blog/2020/04/14/blog-plugin",source:"@site/blog/2020-04-14-blog-plugin.md",description:"You can use our blog plugin to do your posts",date:"2020-04-14T00:00:00.000Z",formattedDate:"April 14, 2020",tags:[{label:"blog",permalink:"/typefs/blog/tags/blog"},{label:"docusaurus",permalink:"/typefs/blog/tags/docusaurus"}],title:"Blog Plugin",readingTime:.145,truncated:!0,prevItem:{title:"A large blog post",permalink:"/typefs/blog/2020/04/14/large-blog-post"},nextItem:{title:"Welcome",permalink:"/typefs/blog/welcome"}},i=[],l={toc:i};function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"You can use our blog plugin to do your posts"),Object(a.b)("p",null,"If you want add your own component, you can use the ",Object(a.b)("inlineCode",{parentName:"p"},"swizzle")," command. Check more at our ",Object(a.b)("a",{parentName:"p",href:"https://v2.docusaurus.io/docs/using-themes#swizzling-theme-components"},"doc")))}p.isMDXComponent=!0},110:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),p=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},s=function(e){var t=p(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,u=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),s=p(n),b=r,m=s["".concat(u,".").concat(b)]||s[b]||f[b]||a;return n?o.a.createElement(m,c(c({ref:t},l),{},{components:n})):o.a.createElement(m,c({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,u=new Array(a);u[0]=b;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:r,u[1]=c;for(var l=2;l<a;l++)u[l]=n[l];return o.a.createElement.apply(null,u)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);