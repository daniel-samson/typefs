(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{114:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return h}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=u(r),d=n,h=p["".concat(s,".").concat(d)]||p[d]||b[d]||o;return r?a.a.createElement(h,i(i({ref:t},l),{},{components:r})):a.a.createElement(h,i({ref:t},l))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,s=new Array(o);s[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var l=2;l<o;l++)s[l]=r[l];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},80:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return s})),r.d(t,"metadata",(function(){return i})),r.d(t,"toc",(function(){return c})),r.d(t,"default",(function(){return u}));var n=r(3),a=r(7),o=(r(0),r(114)),s={title:"Processes",sidebar_label:"Processes"},i={unversionedId:"contributing/processes",id:"contributing/processes",isDocsHomePage:!1,title:"Processes",description:"TypeFS is released in semantic versions, to ensure that users can keep backwards compatibility with the DiskDriver API. Allowing you to build applications with stable versions of TypeFS.",source:"@site/docs/contributing/processes.md",slug:"/contributing/processes",permalink:"/docs/contributing/processes",editUrl:"https://github.com/daniel-samson/typefs/edit/documentation/docs/contributing/processes.md",version:"current",sidebar_label:"Processes",sidebar:"docs",previous:{title:"Join in",permalink:"/docs/contributing/join"}},c=[{value:"Planning Process",id:"planning-process",children:[]},{value:"Development Process",id:"development-process",children:[]},{value:"Quality Assurance Process",id:"quality-assurance-process",children:[]},{value:"Release Process",id:"release-process",children:[{value:"Check list",id:"check-list",children:[]}]},{value:"Documentation Process",id:"documentation-process",children:[]}],l={toc:c};function u(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"TypeFS is released in ",Object(o.b)("a",{parentName:"p",href:"https://semver.org"},"semantic")," versions, to ensure that users can keep backwards compatibility with the DiskDriver API. Allowing you to build applications with stable versions of TypeFS."),Object(o.b)("h2",{id:"planning-process"},"Planning Process"),Object(o.b)("p",null,"Before any development takes place, future versions of TypeFS are planned in advance. Each Major, Minor, and Patch version is associated with a ",Object(o.b)("a",{parentName:"p",href:"https://github.com/daniel-samson/typefs/projects"},"project"),". Over time, the community will create tickets as a bug, an enhancement, or a documentation request on the ",Object(o.b)("a",{parentName:"p",href:"https://github.com/daniel-samson/typefs/issues"},"issue")," tracker. These tickets are then planned into a projects (or versions). Projects are then prioritized by urgency. So Patch versions will be worked on first before Minor versions. Minor patches are worked on before Major versions. Sometimes tickets will be moved back into a future version, depending on the resource available and how urgent a ticket is. The projects are also referred to as the road map."),Object(o.b)("h2",{id:"development-process"},"Development Process"),Object(o.b)("p",null,"When work has started on the next version of TypeFS, the tickets on the associated project will be assigned to contributors. These tickets are then taken from the TODO column and place into the progress column. This signifies that the work is being carried out. The assigned code contributors are expected to create a new branch from the main branch. The branch must be named with the 'feature/' or 'fix/' prefix. For the sake transparency, a pull request should be created while working on a ticket but it is not strictly required to create a pull request while working on a ticket. A pull request must be labeled as work in progress and do not merge during development. When the a work on a ticket has been completed, all labels should be removed. "),Object(o.b)("p",null,"Before a pull request can be merged into the code base, it must be reviewed by a trusted contributor, and it must pass automated checks. It is expected that code contributors provide automated tests to cover 100% of the new code which they have introduced. However, other code contributor may help to provide automated tests."),Object(o.b)("p",null,"Once a pull request has passed all the required checks, it will be merged into the project. Then the associated ticket in the project must taken from the in progress column into the done column."),Object(o.b)("h2",{id:"quality-assurance-process"},"Quality Assurance Process"),Object(o.b)("p",null,"When all tickets are in the done column, a manual test will be conducted to verify that most of the key features of TypeFS are working. If any issues are found, then bug tickets should be made on the issue tracker and then added to project. The version will not be ready for release until such issues are addressed."),Object(o.b)("h2",{id:"release-process"},"Release Process"),Object(o.b)("p",null,"Releases are managed by the ",Object(o.b)("a",{parentName:"p",href:"https://github.com/daniel-samson/typefs/actions/workflows/release.yml"},"Release")," github workflow. Which automatically creates github releases and publishes to npm. The following check list must be carried out during the release process:"),Object(o.b)("h3",{id:"check-list"},"Check list"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"Project tickets are in the done column"),Object(o.b)("li",{parentName:"ol"},"Ensure that automated tests cover 100% of the code in the project"),Object(o.b)("li",{parentName:"ol"},"Ensure that manual test must be run to ensure that all features are stable"),Object(o.b)("li",{parentName:"ol"},"Update .gitignore (if applicable)"),Object(o.b)("li",{parentName:"ol"},"Update .npmignore (only the package.json, package-lock.json and the dist folder should allowed in the npm package)"),Object(o.b)("li",{parentName:"ol"},"Update CHANGELOG, follow the ",Object(o.b)("a",{parentName:"li",href:"https://keepachangelog.com/en/1.0.0/"},"how to keep a changelog")," guide."),Object(o.b)("li",{parentName:"ol"},'Create a release branch eg major/v1.2.3, minor/v1.2.3, or patch/v1.2.3 from the "main" branch'),Object(o.b)("li",{parentName:"ol"},'Create a pull request and name it the after the project name. Set the base branch to "main" branch'),Object(o.b)("li",{parentName:"ol"},"Label the pr either Major, Minor, Path"),Object(o.b)("li",{parentName:"ol"},"Wait for the release pull request to pass all checks"),Object(o.b)("li",{parentName:"ol"},"Merge release pull request "),Object(o.b)("li",{parentName:"ol"},"Ensure that CHANGELOG for said version is in the release notes"),Object(o.b)("li",{parentName:"ol"},"Close project"),Object(o.b)("li",{parentName:"ol"},"Celebrate!!!")),Object(o.b)("h2",{id:"documentation-process"},"Documentation Process"),Object(o.b)("p",null,"Changes to documentation are typically done after the release of a new version of TypeFS. The documentation site is built automatically, when pull requests are merged into the documentation branch. The following is how to contribute documentation:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"https://github.com/digitonic/perform-application/issues/new?assignees=&labels=documentation&template=documentation.md&title=Needs+Documentation%3A+"},"Request documentation")),Object(o.b)("li",{parentName:"ul"},"Edit the ",Object(o.b)("a",{parentName:"li",href:"https://github.com/daniel-samson/typefs/tree/documentation"},"documentation")," branch"),Object(o.b)("li",{parentName:"ul"},"Create a PR referencing the documentation request")))}u.isMDXComponent=!0}}]);