(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[631,292],{7747:function(e,t,r){Promise.resolve().then(r.t.bind(r,5250,23)),Promise.resolve().then(r.bind(r,4507)),Promise.resolve().then(r.bind(r,1558)),Promise.resolve().then(r.bind(r,8646)),Promise.resolve().then(r.bind(r,4626))},4507:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return i}});var n=r(7437),s=r(2265),l=r(198);function i(){let e=(0,s.useContext)(l.Context),t=(0,s.useRef)(null),[r,i]=(0,s.useState)(!1),o=e=>{if(!t.current||t.current.hasChildNodes())return;let r=document.createElement("script");r.src="https://giscus.app/client.js",r.async=!0,r.crossOrigin="anonymous",r.setAttribute("data-repo","Mona04/study-log"),r.setAttribute("data-repo-id","R_kgDOJxjrTQ"),r.setAttribute("data-category","Announcements"),r.setAttribute("data-category-id","DIC_kwDOJxjrTc4Ce2KE"),r.setAttribute("data-mapping","pathname"),r.setAttribute("data-strict","0"),r.setAttribute("data-reactions-enabled","1"),r.setAttribute("data-emit-metadata","0"),r.setAttribute("data-input-position","top"),r.setAttribute("data-theme",e?"dark":"light"),r.setAttribute("data-lang","en"),t.current.appendChild(r)};return(0,s.useEffect)(()=>{var t,r;let n=[];return n.push(null==e?void 0:e.statemgr.registerDarkModeEvent(e=>i(e))),i(null!==(t=null==e?void 0:e.statemgr.IsDarkMode())&&void 0!==t&&t),o(null!==(r=null==e?void 0:e.statemgr.IsDarkMode())&&void 0!==r&&r),()=>{n.map(e=>null==e?void 0:e.dispose())}},[]),(0,s.useEffect)(()=>{var e;let t=document.querySelector("iframe.giscus-frame");null==t||null===(e=t.contentWindow)||void 0===e||e.postMessage({giscus:{setConfig:{theme:r?"dark":"light"}}},"https://giscus.app")},[r]),(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("section",{ref:t})})}},1558:function(e,t,r){"use strict";r.r(t);var n=r(7437),s=r(2265),l=r(198);function i(e){let{tag:t}=e,r=(0,s.useContext)(l.Context);return(0,n.jsx)("div",{className:"tw-ml-2 tw-pl-2 tw-pr-2                  tw-rounded-md   tw-bg-color-text-bg hover:tw-bg-color-text-bg-dimmed   ",onClick:()=>{null==r||r.statemgr.openSearch(),null==r||r.searchmgr.searchByTags([t])},children:(0,n.jsx)("p",{className:"tw-inline",children:t})})}t.default=function(e){let{className:t,tags:r}=e;return(0,n.jsxs)("div",{className:"tw-flex tw-flex-row tw-text-sm ".concat(t),children:[(0,n.jsx)("i",{className:"material-symbols-outlined md-sm tw-self-center   tw-w-5",children:"Sell"}),(0,n.jsx)("div",{className:"tw-color-text-dimmed",children:"Tags :"}),null==r?void 0:r.map(e=>(0,n.jsx)(i,{tag:e},e))]})}},8646:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return f}});var n=r(7437),s=r(2265),l=r(7029),i=r(8934),o=r(3851),u=r(5967),a=r(9467),c=r.n(a);let d=(e,t)=>{let r=(0,s.useRef)([]);(0,s.useEffect)(()=>{let n={};t.forEach((e,t)=>{n[e]=t}),document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(e=>{e.id in n&&r.current.push(e)});let s=()=>{let s=r.current.length;for(let i=0;i<s;i++){let o=r.current[i];if(o.getBoundingClientRect().top>100){let r=n[o.id];if(null!=r){var l;e(null!==(l=t[r-1])&&void 0!==l?l:"")}break}i==s-1&&e(t[t.length-1])}};s();let l=(0,u.P2)(s,100);return window.addEventListener("scroll",l),()=>{window.removeEventListener("scroll",l)}},[])};function h(e){return e.children.length>0&&"text"==e.children[0].type?e.children[0].value:""}function f(e){let{mdSrc:t}=e,[r,u]=(0,s.useState)(""),a=[],f=(0,l.l)().use(i.Z).parse(t);(0,o.Vn)(f,"heading",e=>{e.depth<=4&&a.push(e)});var m=function(e,t){let r={headers:e,idx:0,activeID:t},s=[];for(;r.idx<e.length;)s.push(function e(t){let r=t.idx,s=t.headers[r],l=h(s),i=l.replaceAll(" ","-"),o=s.depth;t.idx+=1;let u=[];for(;t.headers.length>t.idx&&t.headers[t.idx].depth>o;)u.push(e(t));let a=0==u.length,d=t.activeID===i;return(0,n.jsxs)("li",{className:d?c().selected:"",children:[(0,n.jsx)("a",{href:"#".concat(i),className:"tw-scroll-smooth",children:l}),!a&&(0,n.jsx)("ul",{children:u})]},"".concat(r))}(r));return(0,n.jsx)("ul",{children:s})}(a,r);return d(u,a.map(e=>h(e).replaceAll(" ","-"))),(0,n.jsxs)("section",{className:c().toc,children:[(0,n.jsx)("header",{children:(0,n.jsx)("h4",{children:"On This Page"})}),m]})}},4626:function(e,t,r){"use strict";r.r(t),r.d(t,{Tooltip:function(){return u},WithTooltip:function(){return a}});var n=r(7437),s=r(2265),l=r(5967),i=r(5726),o=r.n(i);function u(e){let{hoverRef:t}=e,[r,i]=(0,s.useState)(),[u,a]=(0,s.useState)(),[c,d]=(0,s.useState)(),[h,f]=(0,s.useState)({top:"auto",left:"auto",right:"auto"}),m=(0,s.useRef)(!0),p=e=>e.current,v=e=>{if(null==t.current)return;let r=t.current,n=e.target,s={top:e.offsetY+n.offsetTop,left:e.offsetX+n.offsetLeft,right:"auto"};r.clientWidth-s.left<r.clientWidth/3?(s.right=r.clientWidth-s.left,s.left="auto",d(!1)):d(!0),i(n.innerHTML),a(!1),setTimeout(()=>{p(m)||(f(s),a(!0))},100)},g=e=>{m.current=!1},x=e=>{m.current=!0,a(!1)};return(0,s.useEffect)(()=>{let e=[],r=t.current,n=e=>g(e),s=(0,l.P2)(e=>v(e),100),i=e=>x(e);return r.querySelectorAll(".tooltip-hover").forEach(t=>{t.addEventListener("mouseenter",n),t.addEventListener("mousemove",s),t.addEventListener("mouseleave",i),e.push(()=>{t.removeEventListener("mouseenter",n),t.removeEventListener("mousemove",s),t.removeEventListener("mouseleave",i)})}),()=>{e.forEach(e=>e())}},[]),(0,n.jsx)("div",{className:"".concat(o().tooltip," ").concat(u?o().go:""," ").concat(c?o().left:o().right," "),style:{position:"absolute",...h},children:r})}function a(e){let{children:t}=e,r=(0,s.useRef)(null);return(0,n.jsxs)("div",{className:"tw-relative",ref:r,children:[t,(0,n.jsx)(u,{hoverRef:r})]})}},9467:function(e){e.exports={toc:"toc_toc__bVqVp",selected:"toc_selected__HEHtQ"}},5726:function(e){e.exports={tooltip:"tooltip_tooltip__5rF2R",go:"tooltip_go__aEkNn",left:"tooltip_left__0bgo3",right:"tooltip_right__Id7PU"}}},function(e){e.O(0,[250,612,799,198,971,69,744],function(){return e(e.s=7747)}),_N_E=e.O()}]);