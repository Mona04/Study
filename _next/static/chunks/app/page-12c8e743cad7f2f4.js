(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931,404,444,630],{409:function(t,e,n){Promise.resolve().then(n.bind(n,3991)),Promise.resolve().then(n.t.bind(n,5250,23)),Promise.resolve().then(n.bind(n,4626))},4626:function(t,e,n){"use strict";n.r(e),n.d(e,{Tooltip:function(){return l},WithTooltip:function(){return f}});var o=n(7437),r=n(2265),u=n(5967),i=n(5726),s=n.n(i);function l(t){let{hoverRef:e}=t,[n,i]=(0,r.useState)(),[l,f]=(0,r.useState)(),[c,a]=(0,r.useState)(),[h,v]=(0,r.useState)({top:"auto",left:"auto",right:"auto"}),d=(0,r.useRef)(!0),p=t=>t.current,m=t=>{if(null==e.current)return;let n=e.current,o=t.target,r={top:t.offsetY+o.offsetTop,left:t.offsetX+o.offsetLeft,right:"auto"};n.clientWidth-r.left<n.clientWidth/3?(r.right=n.clientWidth-r.left,r.left="auto",a(!1)):a(!0),i(o.innerHTML),f(!1),setTimeout(()=>{p(d)||(v(r),f(!0))},100)},_=t=>{d.current=!1},E=t=>{d.current=!0,f(!1)};return(0,r.useEffect)(()=>{let t=[],n=e.current,o=t=>_(t),r=(0,u.P2)(t=>m(t),100),i=t=>E(t);return n.querySelectorAll(".tooltip-hover").forEach(e=>{e.addEventListener("mouseenter",o),e.addEventListener("mousemove",r),e.addEventListener("mouseleave",i),t.push(()=>{e.removeEventListener("mouseenter",o),e.removeEventListener("mousemove",r),e.removeEventListener("mouseleave",i)})}),()=>{t.forEach(t=>t())}},[]),(0,o.jsx)("div",{className:"".concat(s().tooltip," ").concat(l?s().go:""," ").concat(c?s().left:s().right," "),style:{position:"absolute",...h},children:n})}function f(t){let{children:e}=t,n=(0,r.useRef)(null);return(0,o.jsxs)("div",{className:"tw-relative",ref:n,children:[e,(0,o.jsx)(l,{hoverRef:n})]})}},5967:function(t,e,n){"use strict";function o(){return"/study-log"}function r(t,e){let n=null;return o=>{n||(n=setTimeout(()=>{t(o),n=null},e))}}n.d(e,{P2:function(){return r},bv:function(){return o}})},5726:function(t){t.exports={tooltip:"tooltip_tooltip__5rF2R",go:"tooltip_go__aEkNn",left:"tooltip_left__0bgo3",right:"tooltip_right__Id7PU"}}},function(t){t.O(0,[700,971,69,744],function(){return t(t.s=409)}),_N_E=t.O()}]);