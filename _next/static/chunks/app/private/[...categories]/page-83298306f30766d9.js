(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[292,631],{7351:function(e,t,n){Promise.resolve().then(n.bind(n,3991)),Promise.resolve().then(n.t.bind(n,5250,23)),Promise.resolve().then(n.bind(n,4507)),Promise.resolve().then(n.bind(n,1558)),Promise.resolve().then(n.bind(n,8646))},4507:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return i}});var r=n(7437),s=n(2265),l=n(198);function i(){let e=(0,s.useContext)(l.Context),t=(0,s.useRef)(null),[n,i]=(0,s.useState)(!1),a=e=>{if(!t.current||t.current.hasChildNodes())return;let n=document.createElement("script");n.src="https://giscus.app/client.js",n.async=!0,n.crossOrigin="anonymous",n.setAttribute("data-repo","Mona04/study-log"),n.setAttribute("data-repo-id","R_kgDOJxjrTQ"),n.setAttribute("data-category","Announcements"),n.setAttribute("data-category-id","DIC_kwDOJxjrTc4Ce2KE"),n.setAttribute("data-mapping","pathname"),n.setAttribute("data-strict","0"),n.setAttribute("data-reactions-enabled","1"),n.setAttribute("data-emit-metadata","0"),n.setAttribute("data-input-position","top"),n.setAttribute("data-theme",e?"dark":"light"),n.setAttribute("data-lang","en"),t.current.appendChild(n)};return(0,s.useEffect)(()=>{var t,n;let r=[];return r.push(null==e?void 0:e.statemgr.registerDarkModeEvent(e=>i(e))),i(null!==(t=null==e?void 0:e.statemgr.IsDarkMode())&&void 0!==t&&t),a(null!==(n=null==e?void 0:e.statemgr.IsDarkMode())&&void 0!==n&&n),()=>{r.map(e=>null==e?void 0:e.dispose())}},[]),(0,s.useEffect)(()=>{var e;let t=document.querySelector("iframe.giscus-frame");null==t||null===(e=t.contentWindow)||void 0===e||e.postMessage({giscus:{setConfig:{theme:n?"dark":"light"}}},"https://giscus.app")},[n]),(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("section",{ref:t})})}},1558:function(e,t,n){"use strict";n.r(t);var r=n(7437),s=n(2265),l=n(198);function i(e){let{tag:t}=e,n=(0,s.useContext)(l.Context);return(0,r.jsx)("div",{className:"tw-ml-2 tw-pl-2 tw-pr-2                  tw-rounded-md   tw-bg-color-text-bg hover:tw-bg-color-text-bg-dimmed   ",onClick:()=>{null==n||n.statemgr.openSearch(),null==n||n.searchmgr.searchByTags([t])},children:(0,r.jsx)("p",{className:"tw-inline",children:t})})}t.default=function(e){let{className:t,tags:n}=e;return(0,r.jsxs)("div",{className:"tw-flex tw-flex-row tw-text-sm ".concat(t),children:[(0,r.jsx)("i",{className:"material-symbols-outlined md-sm tw-self-center   tw-w-5",children:"Sell"}),(0,r.jsx)("div",{className:"tw-color-text-dimmed",children:"Tags :"}),null==n?void 0:n.map(e=>(0,r.jsx)(i,{tag:e},e))]})}},8646:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var r=n(7437),s=n(2265),l=n(7029),i=n(8934),a=n(3851),c=n(5967),o=n(9467),u=n.n(o);let d=(e,t)=>{let n=(0,s.useRef)([]);(0,s.useEffect)(()=>{let r={};t.forEach((e,t)=>{r[e]=t}),document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(e=>{e.id in r&&n.current.push(e)});let s=()=>{let s=n.current.length;for(let i=0;i<s;i++){let a=n.current[i];if(a.getBoundingClientRect().top>100){let n=r[a.id];if(null!=n){var l;e(null!==(l=t[n-1])&&void 0!==l?l:"")}break}i==s-1&&e(t[t.length-1])}};s();let l=(0,c.P2)(s,100);return window.addEventListener("scroll",l),()=>{window.removeEventListener("scroll",l)}},[])};function h(e){return e.children.length>0&&"text"==e.children[0].type?e.children[0].value:""}function m(e){let{mdSrc:t}=e,[n,c]=(0,s.useState)(""),o=[],m=(0,l.l)().use(i.Z).parse(t);(0,a.Vn)(m,"heading",e=>{e.depth<=4&&o.push(e)});var f=function(e,t){let n={headers:e,idx:0,activeID:t},s=[];for(;n.idx<e.length;)s.push(function e(t){let n=t.idx,s=t.headers[n],l=h(s),i=l.replaceAll(" ","-"),a=s.depth;t.idx+=1;let c=[];for(;t.headers.length>t.idx&&t.headers[t.idx].depth>a;)c.push(e(t));let o=0==c.length,d=t.activeID===i;return(0,r.jsxs)("li",{className:d?u().selected:"",children:[(0,r.jsx)("a",{href:"#".concat(i),className:"tw-scroll-smooth",children:l}),!o&&(0,r.jsx)("ul",{children:c})]},"".concat(n))}(n));return(0,r.jsx)("ul",{children:s})}(o,n);return d(c,o.map(e=>h(e).replaceAll(" ","-"))),(0,r.jsxs)("section",{className:u().toc,children:[(0,r.jsx)("header",{children:(0,r.jsx)("h4",{children:"On This Page"})}),f]})}},9467:function(e){e.exports={toc:"toc_toc__bVqVp",selected:"toc_selected__HEHtQ"}}},function(e){e.O(0,[991,250,612,799,198,971,69,744],function(){return e(e.s=7351)}),_N_E=e.O()}]);