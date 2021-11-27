(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{104:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return l})),r.d(t,"toc",(function(){return c})),r.d(t,"default",(function(){return p}));var n=r(3),a=r(7),o=(r(0),r(117)),i={title:"How to write files",sidebar_label:"Write files"},l={unversionedId:"how-to/write-files",id:"how-to/write-files",isDocsHomePage:!1,title:"How to write files",description:"Use the storage manager to write or create files to a disk.",source:"@site/docs/how-to/write-files.md",slug:"/how-to/write-files",permalink:"/docs/how-to/write-files",editUrl:"https://github.com/daniel-samson/typefs/edit/documentation/docs/how-to/write-files.md",version:"current",sidebar_label:"Write files",sidebar:"docs",previous:{title:"Configuration",permalink:"/docs/getting-started/configuration"},next:{title:"How to read files",permalink:"/docs/how-to/read-files"}},c=[{value:"Small Files",id:"small-files",children:[]},{value:"Large File",id:"large-file",children:[]},{value:"Example",id:"example",children:[]}],s={toc:c};function p(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Use the ",Object(o.b)("a",{parentName:"p",href:"https://daniel-samson.github.io/typefs/docs/api/storage"},"storage manager")," to write or create files to a disk."),Object(o.b)("h3",{id:"small-files"},"Small Files"),Object(o.b)("p",null,"The ",Object(o.b)("strong",{parentName:"p"},"write()")," method is ideal for writing small files (less than 10KB):"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"import { Storage } from 'typefs;\n\nasync function makeFile() {\n    const path = 'file.txt';\n    const content = Buffer.from('hello world');\n    await Storage.disk('assets').write(path, content);\n}\n")),Object(o.b)("h3",{id:"large-file"},"Large File"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"writeStream()")," is a more memory efficient method, as it can write large files in chunks:"),Object(o.b)("h3",{id:"example"},"Example"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},'import { Storage } from "typefs";\nasync function makeLargeFile() {\n  await Storage.disk("assets").writeStream(\n    "/vlog.mp4",\n    Storage.disk("tmp").readStream("03cdsedc")\n  );\n}\n')))}p.isMDXComponent=!0},117:function(e,t,r){"use strict";r.d(t,"a",(function(){return f})),r.d(t,"b",(function(){return d}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=a.a.createContext({}),p=function(e){var t=a.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},f=function(e){var t=p(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),f=p(r),m=n,d=f["".concat(i,".").concat(m)]||f[m]||u[m]||o;return r?a.a.createElement(d,l(l({ref:t},s),{},{components:r})):a.a.createElement(d,l({ref:t},s))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var s=2;s<o;s++)i[s]=r[s];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);