(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{2863:function(e,t,r){Promise.resolve().then(r.t.bind(r,5250,23)),Promise.resolve().then(r.bind(r,1052)),Promise.resolve().then(r.t.bind(r,2769,23)),Promise.resolve().then(r.bind(r,5990)),Promise.resolve().then(r.bind(r,8427)),Promise.resolve().then(r.bind(r,7380)),Promise.resolve().then(r.bind(r,3915)),Promise.resolve().then(r.bind(r,4956)),Promise.resolve().then(r.bind(r,9961)),Promise.resolve().then(r.bind(r,6960)),Promise.resolve().then(r.bind(r,198)),Promise.resolve().then(r.t.bind(r,1355,23)),Promise.resolve().then(r.t.bind(r,4290,23))},8534:function(e,t,r){"use strict";r.d(t,{w_:function(){return l}});var n=r(2265),i={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},o=n.createContext&&n.createContext(i),a=function(){return(a=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},s=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,n=Object.getOwnPropertySymbols(e);i<n.length;i++)0>t.indexOf(n[i])&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]]);return r};function l(e){return function(t){return n.createElement(c,a({attr:a({},e.attr)},t),function e(t){return t&&t.map(function(t,r){return n.createElement(t.tag,a({key:r},t.attr),e(t.child))})}(e.child))}}function c(e){var t=function(t){var r,i=e.attr,o=e.size,l=e.title,c=s(e,["attr","size","title"]),u=o||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",a({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,i,c,{className:r,style:a(a({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),l&&n.createElement("title",null,l),e.children)};return void 0!==o?n.createElement(o.Consumer,null,function(e){return t(e)}):t(i)}},1052:function(e,t,r){"use strict";r.r(t);var n=r(7437),i=r(2265),o=r(198),a=r(9259),s=r.n(a);t.default=function(e){let{className:t}=e,[r,a]=(0,i.useState)(!1),l=(0,i.useContext)(o.Context);return(0,i.useEffect)(()=>{let e=[];return e.push(null==l?void 0:l.statemgr.registerDarkModeEvent(e=>a(e))),null==l||l.statemgr.setDarkMode(null==l?void 0:l.statemgr.IsDarkMode()),()=>{e.map(e=>null==e?void 0:e.dispose())}},[]),(0,n.jsxs)("div",{className:[s().toggleBtn,t].join(" "),children:[(0,n.jsx)("input",{id:"darkmode-btn",name:"darkmode-btn",type:"checkbox",onChange:e=>{null==l||l.statemgr.setDarkMode(null==l||!l.statemgr.IsDarkMode())},checked:r}),(0,n.jsx)("label",{htmlFor:"darkmode-btn",children:"Toggle"})]})}},5990:function(e,t,r){"use strict";r.r(t);var n=r(7437),i=r(2265),o=r(198),a=r(2769),s=r.n(a);t.default=function(){let e=(0,i.useContext)(o.Context),[t,r]=(0,i.useState)(!1),[a,l]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{let n=[];return n.push(null==e?void 0:e.statemgr.registMenuEvent(e=>{e!=t&&(l(!0),setTimeout(()=>{r(e),l(!1)},150))})),()=>{n.map(e=>null==e?void 0:e.dispose())}},[a,t]),(0,n.jsx)("button",{className:[s()["menu-btn"],t?s().change:"",a?s().animate:""].join(" "),title:"menu button",id:"menu-toggle-btn",type:"button",onClick:r=>{t?null==e||e.statemgr.closeMenu():null==e||e.statemgr.openMenu()},children:(0,n.jsxs)("div",{className:s()["menu-lines"],children:[(0,n.jsx)("div",{className:[s().line,s().line1].join(" ")}),(0,n.jsx)("div",{className:[s().line,s().line2].join(" ")}),(0,n.jsx)("div",{className:[s().line,s().line3].join(" ")})]})})}},8427:function(e,t,r){"use strict";r.r(t);var n=r(7437),i=r(2265),o=r(198),a=r(976);t.default=function(e){let{className:t}=e,r=(0,i.useContext)(o.Context),[s,l]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{let e=[];return e.push(null==r?void 0:r.statemgr.registSearchEvent(e=>l(e))),()=>{e.map(e=>null==e?void 0:e.dispose())}},[]),(0,n.jsx)("button",{className:[t,"hover:tw-text-color-primary"].join(" "),title:"search button",id:"search-open-btn",type:"button",onClick:e=>{s?null==r||r.statemgr.closeSearch():null==r||r.statemgr.openSearch()},children:(0,n.jsx)(a.RB5,{})})}},7380:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return a}});var n=r(7437),i=r(2265),o=r(198);function a(e){let{className:t}=e,r=(0,i.useContext)(o.Context),[a,s]=(0,i.useState)(0);(0,i.useEffect)(()=>{let e=[];return e.push(null==r?void 0:r.statemgr.registMenuEvent(l)),e.push(null==r?void 0:r.statemgr.registSearchEvent(l)),()=>{e.map(e=>null==e?void 0:e.dispose())}},[]);let l=e=>{s(a+(!0===e?1:-1))};return(0,n.jsx)(n.Fragment,{children:a>0&&(0,n.jsx)("section",{className:"".concat(t," tw-z-10  tw-fixed tw-w-full tw-h-full tw-mt-0 tw-top-nav-height tw-opacity-30 tw-bg-color-text-dimmed"),onClick:e=>{null==r||r.statemgr.closeAll()}})})}},3915:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return a}});var n=r(7437),i=r(2265),o=r(198);function a(e){let{children:t}=e,[r,a]=(0,i.useState)(!1),s=(0,i.useContext)(o.Context);return(0,i.useEffect)(()=>{let e=[];return e.push(null==s?void 0:s.statemgr.registSearchEvent(e=>{a(e)})),()=>{e.map(e=>null==e?void 0:e.dispose())}},[]),(0,n.jsx)(n.Fragment,{children:r&&t})}},4956:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return u}});var n=r(7437),i=r(2265),o=r(198);function a(e){let{items:t}=e;return(0,n.jsx)(n.Fragment,{})}r(495),r(3991),r(4626);var s=r(2521),l=r.n(s);class c extends i.Component{componentDidMount(){var e,t,r;let n=this.context;this.mSearchManager=n.searchmgr,this.mDisposables.push(null===(e=this.mSearchManager)||void 0===e?void 0:e.registerSearchInputEvent(this.onSearchInput)),this.mDisposables.push(null===(t=this.mSearchManager)||void 0===t?void 0:t.registerSearchOutputEvent(this.onSearchOutput)),null===(r=this.mSearchManager)||void 0===r||r.re_search()}componentWillUnmount(){this.mDisposables.map(e=>null==e?void 0:e.dispose())}onSearchInput(e){this.setState({keyword:null!=e?e:""})}onSearchOutput(e){this.setState({results:e})}onInputChanged(e){this.setState({keyword:e.target.value})}onClickClear(){this.setState({keyword:""})}onClickSearch(e){var t;null===(t=this.mSearchManager)||void 0===t||t.search(this.state.keyword)}onSubmit(e){var t;e.preventDefault(),null===(t=this.mSearchManager)||void 0===t||t.search(this.state.keyword)}render(){return(0,n.jsxs)("div",{className:"".concat(l()["search-popup"]),children:[(0,n.jsxs)("form",{className:"tw-flex tw-flex-row-reverse tw-border-2 tw-rounded-3xl tw-p-1 tw-pl-4 tw-pr-4 tw-m-2",onSubmit:this.onSubmit,children:[(0,n.jsx)("input",{id:"search-btn",name:"search-btn",type:"button",onClick:this.onClickSearch}),(0,n.jsx)("label",{className:"tw_flex tw-cursor-pointer",htmlFor:"search-btn",children:(0,n.jsx)("i",{className:"material-symbols-outlined tw-text-xl tw-align-middle tw-self-center",children:"search"})}),(0,n.jsx)("div",{className:"tw-border-l-2 tw-border-color-border tw-ml-2 tw-mr-2"}),(0,n.jsx)("button",{id:"search-input-clear-btn",name:"clear-btn",type:"button",onClick:this.onClickClear,children:(0,n.jsx)("i",{className:"material-symbols-outlined tw-text-xl tw-align-middle tw-self-center",children:"close"})}),(0,n.jsx)("input",{className:"tw-bg-transparent tw-w-full",id:"search-input",name:"search-input",type:"textbox",onChange:this.onInputChanged,value:this.state.keyword}),(0,n.jsx)("label",{htmlFor:"search-input"})]}),(0,n.jsx)("div",{className:"".concat(l().results),children:(0,n.jsx)(a,{items:this.state.results})})]})}constructor(e){super(e),this.mDisposables=[],this.state={keyword:"",results:null},this.componentWillUnmount=this.componentWillUnmount.bind(this),this.componentDidMount=this.componentDidMount.bind(this),this.onSearchInput=this.onSearchInput.bind(this),this.onSearchOutput=this.onSearchOutput.bind(this),this.onClickSearch=this.onClickSearch.bind(this),this.onClickClear=this.onClickClear.bind(this),this.onInputChanged=this.onInputChanged.bind(this),this.onSubmit=this.onSubmit.bind(this)}}c.contextType=o.Context;var u=c},9961:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return c}});var n=r(7437),i=r(2265),o=r(5313),a=r(495),s=r(198),l=r(3656);function c(e){var t;let{children:r,label:c,refCount:u,slug:m,depth:d}=e,h=(0,o.usePathname)(),_=null!=h&&(null===(t=h.split("/")[d+1])||void 0===t?void 0:t.toUpperCase())===c.toUpperCase(),g=null==r,[p,f]=(0,i.useState)(!_||g),b=(0,i.useContext)(s.Context);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"\n              tw-flex tw-flex-row tw-justify-start\n              tw-mb-1\n              ".concat(d<1?"tw-font-bold":"tw-font-normal","\n              ").concat(d<1?"mobile:tw-text-xl tw-text-lg":d<2?"mobile:tw-text-lg tw-text-lg":"mobile:tw-text-base tw-text-base","\n           "),children:(0,n.jsxs)("button",{className:"tw-flex tw-flex-row tw-grow",onClick:e=>{f(!p)},children:[(0,n.jsx)("div",{className:"tw-self-center tw-w-6",children:g?(0,n.jsx)(n.Fragment,{}):p?(0,n.jsx)(l.jfD,{}):(0,n.jsx)(l.ZXJ,{})}),(0,n.jsx)(a.Z,{className:"tw-font-sans hover:tw-font-bold tw-align-baseline\n                         ".concat(_?"tw-text-color-primary":"tw-text-color-text "),href:m,onClick:()=>{null==b||b.statemgr.closeAll()},children:"".concat(c).concat(u>0?" (".concat(u,")"):"")})]})}),!p&&(0,n.jsx)("div",{className:"tw-border-l-2 tw-ml-1.5 tw-pl-1.5",children:r})]})}},6960:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return a}});var n=r(7437),i=r(2265),o=r(198);function a(e){let{children:t}=e,[r,a]=(0,i.useState)(!1),s=(0,i.useContext)(o.Context);return(0,i.useEffect)(()=>{let e=[];return e.push(null==s?void 0:s.statemgr.registMenuEvent(e=>{a(e)})),()=>{e.map(e=>null==e?void 0:e.dispose())}},[]),(0,n.jsx)(n.Fragment,{children:r&&t})}},4626:function(e,t,r){"use strict";r.r(t),r.d(t,{Tooltip:function(){return l},WithTooltip:function(){return c}});var n=r(7437),i=r(2265),o=r(5967),a=r(5726),s=r.n(a);function l(e){let{hoverRef:t}=e,[r,a]=(0,i.useState)(),[l,c]=(0,i.useState)(),[u,m]=(0,i.useState)(),[d,h]=(0,i.useState)({top:"auto",left:"auto",right:"auto"}),_=(0,i.useRef)(!0),g=e=>e.current,p=e=>{if(null==t.current)return;let r=t.current,n=e.target,i={top:e.offsetY+n.offsetTop,left:e.offsetX+n.offsetLeft,right:"auto"};r.clientWidth-i.left<r.clientWidth/3?(i.right=r.clientWidth-i.left,i.left="auto",m(!1)):m(!0),a(n.innerHTML),c(!1),setTimeout(()=>{g(_)||(h(i),c(!0))},100)},f=e=>{_.current=!1},b=e=>{_.current=!0,c(!1)};return(0,i.useEffect)(()=>{let e=[],r=t.current,n=e=>f(e),i=(0,o.P2)(e=>p(e),100),a=e=>b(e);return r.querySelectorAll(".tooltip-hover").forEach(t=>{t.addEventListener("mouseenter",n),t.addEventListener("mousemove",i),t.addEventListener("mouseleave",a),e.push(()=>{t.removeEventListener("mouseenter",n),t.removeEventListener("mousemove",i),t.removeEventListener("mouseleave",a)})}),()=>{e.forEach(e=>e())}},[]),(0,n.jsx)("div",{className:"".concat(s().tooltip," ").concat(l?s().go:""," ").concat(u?s().left:s().right," "),style:{position:"absolute",...d},children:r})}function c(e){let{children:t}=e,r=(0,i.useRef)(null);return(0,n.jsxs)("div",{className:"tw-relative",ref:r,children:[t,(0,n.jsx)(l,{hoverRef:r})]})}},495:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});var n=r(7437),i=r(5250),o=r.n(i),a=e=>{let{children:t,href:r,target:i="_self",rel:a,className:s,key:l,onClick:c}=e;return"_blank"==i&&(a="noopener noreferrer"),(0,n.jsx)(o(),{className:s,href:void 0===r?"":r,rel:a,target:i,onClick:c,prefetch:!1,children:t},l)}},1355:function(){},9259:function(e){e.exports={toggleBtn:"darkmode-toggle_toggleBtn__XO5La"}},2769:function(e){e.exports={masthead:"masthead_masthead__zVIwm","menu-btn":"masthead_menu-btn__tZ2_W","menu-lines":"masthead_menu-lines__iNcj5",line:"masthead_line__AM5zP",change:"masthead_change__yYYz8",line1:"masthead_line1__NaE01",line2:"masthead_line2__ai3cP",line3:"masthead_line3__g18ZL",animate:"masthead_animate__G8Cab",rotateR:"masthead_rotateR__nudh_",fade:"masthead_fade__NdRim",rotateL:"masthead_rotateL__KcIB6"}},2521:function(e){e.exports={"search-popup":"search-popup_search-popup__rQedv",results:"search-popup_results__eZlJ7"}},4290:function(e){e.exports={sidebar:"sidebar_sidebar__gN2ma",leftone:"sidebar_leftone__Y8AG1","category-item-0":"sidebar_category-item-0__Ozjud","category-item-1":"sidebar_category-item-1__fEo_0","category-item-2":"sidebar_category-item-2__dBodK","category-item-3":"sidebar_category-item-3__62hWU","category-item-4":"sidebar_category-item-4__9Rwgb","category-item-5":"sidebar_category-item-5__Lpgt4","category-item-6":"sidebar_category-item-6__j7ipe","category-item-7":"sidebar_category-item-7__WTwuF","category-item-8":"sidebar_category-item-8__FohA3","category-item-9":"sidebar_category-item-9__hpaJF","category-item-10":"sidebar_category-item-10__KzzBR","category-item-11":"sidebar_category-item-11__B2v41","category-item-12":"sidebar_category-item-12__KW28u","category-item-13":"sidebar_category-item-13__uRtYi","category-item-14":"sidebar_category-item-14__vYYlv","category-item-15":"sidebar_category-item-15__MPn5y","category-item-16":"sidebar_category-item-16__1sIHL","category-item-17":"sidebar_category-item-17__z2_Hf","category-item-18":"sidebar_category-item-18__LkSa3","category-item-19":"sidebar_category-item-19__HPzAK","category-item-20":"sidebar_category-item-20__mcgBU","category-item-21":"sidebar_category-item-21__6aVPU","category-item-22":"sidebar_category-item-22__WQCyO","category-item-23":"sidebar_category-item-23__vq0Vu","category-item-24":"sidebar_category-item-24__qzatx","category-item-25":"sidebar_category-item-25__gXDOM","category-item-26":"sidebar_category-item-26__olnp5","category-item-27":"sidebar_category-item-27__ODXsp","category-item-28":"sidebar_category-item-28__XYFiI","category-item-29":"sidebar_category-item-29__zkZK_","category-item-30":"sidebar_category-item-30__iL7VH","category-item-31":"sidebar_category-item-31__Za_xN","category-item-32":"sidebar_category-item-32__TjLOx","category-item-33":"sidebar_category-item-33___Be4s","category-item-34":"sidebar_category-item-34__3F4S0","category-item-35":"sidebar_category-item-35__TpLIA","category-item-36":"sidebar_category-item-36__IhCjt","category-item-37":"sidebar_category-item-37__6mPwU","category-item-38":"sidebar_category-item-38__rrdQi","category-item-39":"sidebar_category-item-39__HfwHj","category-item-40":"sidebar_category-item-40__c3Bov"}},5726:function(e){e.exports={tooltip:"tooltip_tooltip__5rF2R",go:"tooltip_go__aEkNn",left:"tooltip_left__0bgo3",right:"tooltip_right__Id7PU"}}},function(e){e.O(0,[929,712,700,612,198,971,69,744],function(){return e(e.s=2863)}),_N_E=e.O()}]);