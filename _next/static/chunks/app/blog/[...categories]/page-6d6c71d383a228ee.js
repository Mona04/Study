(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[631],{9841:function(e,t,n){Promise.resolve().then(n.t.bind(n,6685,23)),Promise.resolve().then(n.t.bind(n,3015,23)),Promise.resolve().then(n.bind(n,8832))},8832:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return a}});var l=n(7437),r=n(2265),c=n(7742),i=n(5520),s=n(4680),h=n(8552),o=n.n(h);let u=(e,t)=>{let n=(0,r.useRef)([]);(0,r.useEffect)(()=>{let l;let r={};t.forEach((e,t)=>{r[e]=t}),document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(e=>{e.id in r&&n.current.push(e)});let c=()=>{let l=n.current.length;for(let i=0;i<l;i++){let s=n.current[i];if(s.getBoundingClientRect().top>100){let n=r[s.id];if(null!=n){var c;e(null!==(c=t[n-1])&&void 0!==c?c:"")}break}i==l-1&&e(t[t.length-1])}};c();let i=(l=null,()=>{l||(l=setTimeout(()=>{c(),l=null},100))});return window.addEventListener("scroll",i),()=>{window.removeEventListener("scroll",i)}},[])};function d(e){return e.children.length>0&&"text"==e.children[0].type?e.children[0].value:""}function a(e){let{mdSrc:t}=e,[n,h]=(0,r.useState)(""),a=[],f=(0,c.l)().use(i.Z).parse(t);(0,s.Vn)(f,"heading",e=>{e.depth<=4&&a.push(e)});var p=function(e,t){let n={headers:e,idx:0,activeID:t},r=[];for(;n.idx<e.length;)r.push(function e(t){let n=t.idx,r=t.headers[n],c=d(r),i=c.replaceAll(" ","-"),s=r.depth;t.idx+=1;let h=[];for(;t.headers.length>t.idx&&t.headers[t.idx].depth>s;)h.push(e(t));let u=0==h.length,a=t.activeID===i;return(0,l.jsxs)("li",{className:a?o().selected:"",children:[(0,l.jsx)("a",{href:"#".concat(i),className:"tw-scroll-smooth",children:c}),!u&&(0,l.jsx)("ul",{children:h})]},"toc-item-id-".concat(c).concat(n))}(n));return(0,l.jsx)("ul",{children:r})}(a,n);return u(h,a.map(e=>d(e).replaceAll(" ","-"))),(0,l.jsxs)("section",{className:o().toc,children:[(0,l.jsx)("header",{children:(0,l.jsx)("h4",{children:"On This Page"})}),p]})}},8552:function(e){e.exports={toc:"toc_toc__bVqVp",selected:"toc_selected__HEHtQ"}}},function(e){e.O(0,[685,414,971,596,744],function(){return e(e.s=9841)}),_N_E=e.O()}]);