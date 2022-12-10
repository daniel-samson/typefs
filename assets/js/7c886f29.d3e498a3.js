"use strict";(self.webpackChunktypefs_docs=self.webpackChunktypefs_docs||[]).push([[1847],{3905:(t,e,a)=>{a.d(e,{Zo:()=>m,kt:()=>h});var r=a(7294);function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function i(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?i(Object(a),!0).forEach((function(e){n(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,r,n=function(t,e){if(null==t)return{};var a,r,n={},i=Object.keys(t);for(r=0;r<i.length;r++)a=i[r],e.indexOf(a)>=0||(n[a]=t[a]);return n}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)a=i[r],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}var p=r.createContext({}),s=function(t){var e=r.useContext(p),a=e;return t&&(a="function"==typeof t?t(e):l(l({},e),t)),a},m=function(t){var e=s(t.components);return r.createElement(p.Provider,{value:e},t.children)},d="mdxType",k={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},u=r.forwardRef((function(t,e){var a=t.components,n=t.mdxType,i=t.originalType,p=t.parentName,m=o(t,["components","mdxType","originalType","parentName"]),d=s(a),u=n,h=d["".concat(p,".").concat(u)]||d[u]||k[u]||i;return a?r.createElement(h,l(l({ref:e},m),{},{components:a})):r.createElement(h,l({ref:e},m))}));function h(t,e){var a=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var i=a.length,l=new Array(i);l[0]=u;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o[d]="string"==typeof t?t:n,l[1]=o;for(var s=2;s<i;s++)l[s]=a[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},9154:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var r=a(7462),n=(a(7294),a(3905));const i={title:"Disk Driver",sidebar_label:"Disk Driver"},l=void 0,o={unversionedId:"api/disk-driver",id:"api/disk-driver",title:"Disk Driver",description:"Disk Driver is the common interface between all disks. This means that you only need to learn one set of methods across the different file system types.",source:"@site/docs/api/disk-driver.md",sourceDirName:"api",slug:"/api/disk-driver",permalink:"/docs/api/disk-driver",draft:!1,editUrl:"https://github.com/daniel-samson/typefs/edit/documentation/docs/api/disk-driver.md",tags:[],version:"current",frontMatter:{title:"Disk Driver",sidebar_label:"Disk Driver"},sidebar:"docs",previous:{title:"Storage Manager",permalink:"/docs/api/storage"},next:{title:"Config",permalink:"/docs/api/config"}},p={},s=[{value:"Writing Files",id:"writing-files",level:2},{value:"Example",id:"example",level:3},{value:"write()",id:"write",level:3},{value:"Parameters",id:"parameters",level:4},{value:"writeStream()",id:"writestream",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Reading Files",id:"reading-files",level:2},{value:"Example",id:"example-1",level:3},{value:"Parameters",id:"parameters-2",level:3},{value:"Deleting Files",id:"deleting-files",level:2},{value:"Example",id:"example-2",level:3},{value:"Parameters",id:"parameters-3",level:3},{value:"Deleting Directory",id:"deleting-directory",level:2},{value:"Example",id:"example-3",level:3},{value:"Parameters",id:"parameters-4",level:3},{value:"Creates Directory",id:"creates-directory",level:2},{value:"Example",id:"example-4",level:3},{value:"Parameters",id:"parameters-5",level:3},{value:"List Contents of Directory",id:"list-contents-of-directory",level:2},{value:"Example",id:"example-5",level:3},{value:"Parameters",id:"parameters-6",level:3},{value:"Path Exists",id:"path-exists",level:2},{value:"Example",id:"example-6",level:3},{value:"Parameters",id:"parameters-7",level:3},{value:"Last Modified",id:"last-modified",level:2},{value:"Example",id:"example-7",level:3},{value:"Parameters",id:"parameters-8",level:3},{value:"File Size",id:"file-size",level:2},{value:"Example",id:"example-8",level:3},{value:"Parameters",id:"parameters-9",level:3},{value:"Move or Rename",id:"move-or-rename",level:2},{value:"Example",id:"example-9",level:3},{value:"Parameters",id:"parameters-10",level:3},{value:"Copy",id:"copy",level:2},{value:"Example",id:"example-10",level:3},{value:"Parameters",id:"parameters-11",level:3}],m={toc:s};function d(t){let{components:e,...a}=t;return(0,n.kt)("wrapper",(0,r.Z)({},m,a,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Disk Driver is the common interface between all disks. This means that you only need to learn one set of methods across the different file system types."),(0,n.kt)("h2",{id:"writing-files"},"Writing Files"),(0,n.kt)("p",null,"TypeFS offers two methods for writing files: ",(0,n.kt)("strong",{parentName:"p"},"write()")," and ",(0,n.kt)("strong",{parentName:"p"},"writeStream()"),". The ",(0,n.kt)("strong",{parentName:"p"},"write()")," method is ideal for writing small files (less than 10KB). The ",(0,n.kt)("strong",{parentName:"p"},"writeStream()")," method is more memory efficient, as it can write large files in chunks."),(0,n.kt)("h3",{id:"example"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Storage } from "typefs";\n\ntry {\n  // write small file\n  const contents = "hello";\n  await Storage.disk().write("manifest.json", contents);\n\n  // copy large file\n  await Storage.disk().writeStream(\n    "/vlog.mp4",\n    Storage.disk("tmp").readStream("03cdsedc")\n  );\n} catch (e) {\n  // handle the error\n}\n')),(0,n.kt)("h3",{id:"write"},"write()"),(0,n.kt)("h4",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"path relative to disks root")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"data"),(0,n.kt)("td",{parentName:"tr",align:null},"Buffer"),(0,n.kt)("td",{parentName:"tr",align:null},"contents of file")))),(0,n.kt)("h3",{id:"writestream"},"writeStream()"),(0,n.kt)("h4",{id:"parameters-1"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"path relative to disks root")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"data"),(0,n.kt)("td",{parentName:"tr",align:null},"Stream"),(0,n.kt)("td",{parentName:"tr",align:null},"contents of file")))),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Returns:")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise<void>"))),(0,n.kt)("admonition",{type:"danger"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Throws:")," Error when path is outside the disks root directory and configuration.jail is set to true")),(0,n.kt)("h2",{id:"reading-files"},"Reading Files"),(0,n.kt)("p",null,"TypeFS offers two methods for reading files: ",(0,n.kt)("strong",{parentName:"p"},"read()")," and ",(0,n.kt)("strong",{parentName:"p"},"readStream()"),". The ",(0,n.kt)("strong",{parentName:"p"},"read()")," method is ideal for retrieving small files (less than 10KB). The ",(0,n.kt)("strong",{parentName:"p"},"readStream()")," method is more memory efficient, as it can read large files in chunks."),(0,n.kt)("h3",{id:"example-1"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Storage } from "typefs";\n\ntry {\n  // small files\n  const contents: Buffer = await Storage.disk().read("manifest.json");\n  console.log(contents.toString());\n\n  // large files\n  const stream: Readable = await Storage.disk().readStream("podcast.mp3");\n  const buffer: any[] = [];\n  stream.on("data", (part: any) => {\n    // do something with part\n  });\n  stream.on("error", reject);\n  stream.on("end", () => {\n    console.log("stream has ended, there is no more data to fetch");\n  });\n} catch (e) {\n  // handle the error\n}\n')),(0,n.kt)("h3",{id:"parameters-2"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"path relative to disks root")))),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},"read ",(0,n.kt)("strong",{parentName:"p"},"Returns:")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise<Buffer>"),". The Buffer is the contents of file.\nreadStream ",(0,n.kt)("strong",{parentName:"p"},"Returns:")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise<Readable>"),". The Readable is a stream of the contents of file.")),(0,n.kt)("admonition",{type:"danger"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Throws:")," Error when path is outside the disks root directory and configuration.jail is set to true")),(0,n.kt)("h2",{id:"deleting-files"},"Deleting Files"),(0,n.kt)("h3",{id:"example-2"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Storage } from "typefs";\n\ntry {\n  await Storage.disk().deleteFile("manifest.json");\n} catch (e) {\n  // handle the error\n}\n')),(0,n.kt)("h3",{id:"parameters-3"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"path relative to disks root")))),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Returns:")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise<void>"),".")),(0,n.kt)("admonition",{type:"danger"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Throws:")," Error when path is outside the disks root directory and configuration.jail is set to true")),(0,n.kt)("h2",{id:"deleting-directory"},"Deleting Directory"),(0,n.kt)("p",null,"Removes directory"),(0,n.kt)("h3",{id:"example-3"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Storage } from "typefs";\n\ntry {\n  await Storage.disk().deleteDirectory("profiles");\n} catch (e) {\n  // handle the error\n}\n')),(0,n.kt)("h3",{id:"parameters-4"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"path relative to disks root")))),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Returns:")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise<void>"),".")),(0,n.kt)("admonition",{type:"danger"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Throws:")," Error when path is outside the disks root directory and configuration.jail is set to true")),(0,n.kt)("h2",{id:"creates-directory"},"Creates Directory"),(0,n.kt)("p",null,"Creates directory"),(0,n.kt)("h3",{id:"example-4"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Storage } from "typefs";\n\ntry {\n  await Storage.disk().createDirectory("profiles");\n} catch (e) {\n  // handle the error\n}\n')),(0,n.kt)("h3",{id:"parameters-5"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"path relative to disks root")))),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Returns:")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise<void>"),".")),(0,n.kt)("admonition",{type:"danger"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Throws:")," Error when path is outside the disks root directory and configuration.jail is set to true")),(0,n.kt)("h2",{id:"list-contents-of-directory"},"List Contents of Directory"),(0,n.kt)("p",null,"There are two ways to list the contents of a directory. You can list the contents of the directory or you can list the contents of the directory including the subdirectories and files as well."),(0,n.kt)("h3",{id:"example-5"},"Example"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"List Contents")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Storage } from "typefs";\n\ntry {\n  await Storage.disk().listContents("/profiles");\n} catch (e) {\n  // handle the error\n}\n')),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"List Contents of Directory including subdirectories and files")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Storage } from "typefs";\n\ntry {\n  await Storage.disk().listContents("profiles", { recursive: true });\n} catch (e) {\n  // handle the error\n}\n')),(0,n.kt)("h3",{id:"parameters-6"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"path relative to disks root")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"options"),(0,n.kt)("td",{parentName:"tr",align:null},"ListDirectoryOptions"),(0,n.kt)("td",{parentName:"tr",align:null},"when recursive is set to true all subdirectories and files are returned")))),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Returns:")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise<string[]>")," An array of paths relative to the disks root directory.")),(0,n.kt)("admonition",{type:"danger"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Throws:")," Error when path is outside the disks root directory and configuration.jail is set to true")),(0,n.kt)("h2",{id:"path-exists"},"Path Exists"),(0,n.kt)("h3",{id:"example-6"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Storage } from "typefs";\n\ntry {\n  if (await Storage.disk().exists("profiles")) {\n    // do some other fs operation\n  }\n} catch (e) {\n  // handle the error\n}\n')),(0,n.kt)("h3",{id:"parameters-7"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"path relative to disks root")))),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Returns:")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise<boolean>")," true if files exists")),(0,n.kt)("admonition",{type:"danger"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Throws:")," Error when path is outside the disks root directory and configuration.jail is set to true")),(0,n.kt)("h2",{id:"last-modified"},"Last Modified"),(0,n.kt)("h3",{id:"example-7"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Storage } from 'typefs';\n\ntry {\n    const lastModified: Date = await Storage.disk().lastModified('profiles'));\n    // ...\n} catch (e) {\n    // handle the error\n}\n")),(0,n.kt)("h3",{id:"parameters-8"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"path relative to disks root")))),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Returns:")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise<Date>")," Date object of when the path was last modified")),(0,n.kt)("admonition",{type:"danger"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Throws:")," Error when path is outside the disks root directory and configuration.jail is set to true")),(0,n.kt)("h2",{id:"file-size"},"File Size"),(0,n.kt)("h3",{id:"example-8"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Storage } from 'typefs';\n\ntry {\n    const fileSize: Number = await Storage.disk().fileSize('profiles'));\n    // ...\n} catch (e) {\n    // handle the error\n}\n")),(0,n.kt)("h3",{id:"parameters-9"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"path relative to disks root")))),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Returns:")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise<Number>")," Positive integer of the file size in bytes.")),(0,n.kt)("admonition",{type:"danger"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Throws:")," Error when path is outside the disks root directory and configuration.jail is set to true")),(0,n.kt)("h2",{id:"move-or-rename"},"Move or Rename"),(0,n.kt)("h3",{id:"example-9"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Storage } from 'typefs';\n\ntry {\n    await Storage.disk().move('a.txt', 'b.txt'));\n    // ...\n} catch (e) {\n    // handle the error\n}\n")),(0,n.kt)("h3",{id:"parameters-10"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"source"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"from path relative to disks root")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"destination"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"to path relative to disks root")))),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Returns:")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise<void>"),".")),(0,n.kt)("admonition",{type:"danger"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Throws:")," Error when path is outside the disks root directory and configuration.jail is set to true")),(0,n.kt)("h2",{id:"copy"},"Copy"),(0,n.kt)("h3",{id:"example-10"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Storage } from 'typefs';\n\ntry {\n    await Storage.disk().copy('a.txt', 'b.txt'));\n    // ...\n} catch (e) {\n    // handle the error\n}\n")),(0,n.kt)("h3",{id:"parameters-11"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"source"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"from path relative to disks root")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"destination"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"to path relative to disks root")))),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Returns:")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise<void>"),".")),(0,n.kt)("admonition",{type:"danger"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Throws:")," Error when path is outside the disks root directory and configuration.jail is set to true")))}d.isMDXComponent=!0}}]);