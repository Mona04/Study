(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{2863:function(t,e,r){Promise.resolve().then(r.t.bind(r,5250,23)),Promise.resolve().then(r.bind(r,1052)),Promise.resolve().then(r.t.bind(r,2769,23)),Promise.resolve().then(r.bind(r,5990)),Promise.resolve().then(r.bind(r,8427)),Promise.resolve().then(r.bind(r,7380)),Promise.resolve().then(r.bind(r,3915)),Promise.resolve().then(r.bind(r,4956)),Promise.resolve().then(r.bind(r,9961)),Promise.resolve().then(r.bind(r,6960)),Promise.resolve().then(r.bind(r,198)),Promise.resolve().then(r.t.bind(r,1355,23)),Promise.resolve().then(r.t.bind(r,4290,23))},8534:function(t,e,r){"use strict";r.d(e,{w_:function(){return l}});var i=r(2265),n={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},o=i.createContext&&i.createContext(n),s=function(){return(s=Object.assign||function(t){for(var e,r=1,i=arguments.length;r<i;r++)for(var n in e=arguments[r])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)},a=function(t,e){var r={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&0>e.indexOf(i)&&(r[i]=t[i]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols)for(var n=0,i=Object.getOwnPropertySymbols(t);n<i.length;n++)0>e.indexOf(i[n])&&Object.prototype.propertyIsEnumerable.call(t,i[n])&&(r[i[n]]=t[i[n]]);return r};function l(t){return function(e){return i.createElement(c,s({attr:s({},t.attr)},e),function t(e){return e&&e.map(function(e,r){return i.createElement(e.tag,s({key:r},e.attr),t(e.child))})}(t.child))}}function c(t){var e=function(e){var r,n=t.attr,o=t.size,l=t.title,c=a(t,["attr","size","title"]),u=o||e.size||"1em";return e.className&&(r=e.className),t.className&&(r=(r?r+" ":"")+t.className),i.createElement("svg",s({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},e.attr,n,c,{className:r,style:s(s({color:t.color||e.color},e.style),t.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),l&&i.createElement("title",null,l),t.children)};return void 0!==o?i.createElement(o.Consumer,null,function(t){return e(t)}):e(n)}},1052:function(t,e,r){"use strict";r.r(e);var i=r(7437),n=r(2265),o=r(198),s=r(9259),a=r.n(s);e.default=function(t){let{className:e}=t,[r,s]=(0,n.useState)(!1),l=(0,n.useContext)(o.Context);return(0,n.useEffect)(()=>{let t=[];return t.push(null==l?void 0:l.statemgr.registerDarkModeEvent(t=>s(t))),null==l||l.statemgr.setDarkMode(null==l?void 0:l.statemgr.IsDarkMode()),()=>{t.map(t=>null==t?void 0:t.dispose())}},[]),(0,i.jsxs)("div",{className:[a().toggleBtn,e].join(" "),children:[(0,i.jsx)("input",{id:"darkmode-btn",name:"darkmode-btn",type:"checkbox",onChange:t=>{null==l||l.statemgr.setDarkMode(null==l||!l.statemgr.IsDarkMode())},checked:r}),(0,i.jsx)("label",{htmlFor:"darkmode-btn",children:"Toggle"})]})}},5990:function(t,e,r){"use strict";r.r(e);var i=r(7437),n=r(2265),o=r(198),s=r(2769),a=r.n(s);e.default=function(){let t=(0,n.useContext)(o.Context),[e,r]=(0,n.useState)(!1),[s,l]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{let i=[];return i.push(null==t?void 0:t.statemgr.registMenuEvent(t=>{t!=e&&(l(!0),setTimeout(()=>{r(t),l(!1)},150))})),()=>{i.map(t=>null==t?void 0:t.dispose())}},[s,e]),(0,i.jsx)("button",{className:[a()["menu-btn"],e?a().change:"",s?a().animate:""].join(" "),title:"menu button",id:"menu-toggle-btn",type:"button",onClick:r=>{e?null==t||t.statemgr.closeMenu():null==t||t.statemgr.openMenu()},children:(0,i.jsxs)("div",{className:a()["menu-lines"],children:[(0,i.jsx)("div",{className:[a().line,a().line1].join(" ")}),(0,i.jsx)("div",{className:[a().line,a().line2].join(" ")}),(0,i.jsx)("div",{className:[a().line,a().line3].join(" ")})]})})}},8427:function(t,e,r){"use strict";r.r(e);var i=r(7437),n=r(2265),o=r(198),s=r(976);e.default=function(t){let{className:e}=t,r=(0,n.useContext)(o.Context),[a,l]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{let t=[];return t.push(null==r?void 0:r.statemgr.registSearchEvent(t=>l(t))),()=>{t.map(t=>null==t?void 0:t.dispose())}},[]),(0,i.jsx)("button",{className:[e,"hover:tw-text-color-primary"].join(" "),title:"search button",id:"search-open-btn",type:"button",onClick:t=>{a?null==r||r.statemgr.closeSearch():null==r||r.statemgr.openSearch()},children:(0,i.jsx)(s.RB5,{})})}},7380:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return s}});var i=r(7437),n=r(2265),o=r(198);function s(t){let{className:e}=t,r=(0,n.useContext)(o.Context),[s,a]=(0,n.useState)(0);(0,n.useEffect)(()=>{let t=[];return t.push(null==r?void 0:r.statemgr.registMenuEvent(l)),t.push(null==r?void 0:r.statemgr.registSearchEvent(l)),()=>{t.map(t=>null==t?void 0:t.dispose())}},[]);let l=t=>{a(s+(!0===t?1:-1))};return(0,i.jsx)(i.Fragment,{children:s>0&&(0,i.jsx)("section",{className:"".concat(e," tw-z-10  tw-fixed tw-w-full tw-h-full tw-mt-0 tw-top-nav-height tw-opacity-30 tw-bg-color-text-dimmed"),onClick:t=>{null==r||r.statemgr.closeAll()}})})}},3915:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return s}});var i=r(7437),n=r(2265),o=r(198);function s(t){let{children:e}=t,[r,s]=(0,n.useState)(!1),a=(0,n.useContext)(o.Context);return(0,n.useEffect)(()=>{let t=[];return t.push(null==a?void 0:a.statemgr.registSearchEvent(t=>{s(t)})),()=>{t.map(t=>null==t?void 0:t.dispose())}},[]),(0,i.jsx)(i.Fragment,{children:r&&e})}},4956:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return x}});var i=r(7437),n=r(2265),o=r(198),s=r(1983),a=r(495),l=r(3991),c=r(5967),u=t=>{let{children:e=null,src:r,alt:n,width:o,height:s,fill:a,priority:u=!1,className:m}=t,d="".concat((0,c.bv)()).concat(r);return(0,i.jsx)(l.default,{src:d,alt:n,className:m,width:o,height:s,fill:a,priority:u,children:e})},m=r(4626);function d(t){let{slug:e,title:r,description:n,thumbnail:o}=t;return(0,i.jsx)(m.WithTooltip,{children:(0,i.jsx)("article",{className:"mobile:tw-h-24 tw-m-1   tw-border-2 tw-rounded-2xl tw-border-color-border   hover:tw-border-color-primary hover:tw-transition-all hover:tw-duration-500",children:(0,i.jsx)(a.Z,{href:encodeURI(e),children:(0,i.jsxs)("div",{className:"tw-grid mobile:tw-grid-cols-3 tw-m-2 tw-overflow-hidden",children:[(0,i.jsx)("div",{className:"mobile:tw-col-span-1 mobile:tw-h-20 desk:tw-max-h-40 desk:tw-mb-2 w-m-1 tw-border-2 tw-border-color-border ",children:(0,i.jsx)(u,{className:"tw-h-full tw-w-full",src:null!=o?o:"/images/empty-300x200.jpg",alt:"Thumbnail",width:256,height:256,priority:!0})}),(0,i.jsxs)("div",{className:"mobile:tw-col-span-2 mobile:tw-h-20 desk:tw-max-h-36 tw-mx-2 tw-overflow-hidden",children:[(0,i.jsx)("h4",{className:"tw-mb-0 tw-mt-0    tw-whitespace-nowrap tw-text-ellipsis tw-overflow-hidden tooltip-hover",children:r}),(0,i.jsx)("p",{className:"tw-text-color-text-light tw-text-sm    tw-text-ellipsis tw-overflow-hidden tooltip-hover",children:n})]})]})})})})}function h(t){let{item:e}=t,r=(0,s.h$)(e);return void 0==r?(0,i.jsx)(i.Fragment,{}):(0,i.jsx)(d,{slug:r.slug,title:r.title,description:r.description,thumbnail:r.thumbnail})}function _(t){let{items:e}=t;return null==e||e.length<1?(0,i.jsx)("p",{className:"tw-text-color-text-light tw-ml-auto tw-mr-auto",children:"No Results!"}):e.map((t,e)=>(0,i.jsx)(h,{item:t},e))}function g(t){let{children:e}=t;return(0,i.jsx)("div",{className:"tw-grid tw-grid-cols-1 desk:tw-grid-cols-2 medium:tw-grid-cols-3",children:e})}function p(){return(0,i.jsx)("div",{className:"tw-grid",children:(0,i.jsx)("p",{className:"tw-text-color-text-light tw-ml-auto tw-mr-auto",children:"No Results!"})})}function b(t){let{items:e}=t;return null==e||e.length<1?(0,i.jsx)(p,{}):(0,i.jsx)("section",{className:"tw-m-3",children:(0,i.jsx)(g,{children:(0,i.jsx)(_,{items:e})})})}var f=r(2521),w=r.n(f);class v extends n.Component{componentDidMount(){var t,e,r;let i=this.context;this.mSearchManager=i.searchmgr,this.mDisposables.push(null===(t=this.mSearchManager)||void 0===t?void 0:t.registerSearchInputEvent(this.onSearchInput)),this.mDisposables.push(null===(e=this.mSearchManager)||void 0===e?void 0:e.registerSearchOutputEvent(this.onSearchOutput)),null===(r=this.mSearchManager)||void 0===r||r.re_search()}componentWillUnmount(){this.mDisposables.map(t=>null==t?void 0:t.dispose())}onSearchInput(t){this.setState({keyword:null!=t?t:""})}onSearchOutput(t){this.setState({results:t})}onInputChanged(t){this.setState({keyword:t.target.value})}onClickClear(){this.setState({keyword:""})}onClickSearch(t){var e;null===(e=this.mSearchManager)||void 0===e||e.search(this.state.keyword)}onSubmit(t){var e;t.preventDefault(),null===(e=this.mSearchManager)||void 0===e||e.search(this.state.keyword)}render(){return(0,i.jsxs)("div",{className:"".concat(w()["search-popup"]),children:[(0,i.jsxs)("form",{className:"tw-flex tw-flex-row-reverse tw-border-2 tw-rounded-3xl tw-p-1 tw-pl-4 tw-pr-4 tw-m-2",onSubmit:this.onSubmit,children:[(0,i.jsx)("input",{id:"search-btn",name:"search-btn",type:"button",onClick:this.onClickSearch}),(0,i.jsx)("label",{className:"tw_flex tw-cursor-pointer",htmlFor:"search-btn",children:(0,i.jsx)("i",{className:"material-symbols-outlined tw-text-xl tw-align-middle tw-self-center",children:"search"})}),(0,i.jsx)("div",{className:"tw-border-l-2 tw-border-color-border tw-ml-2 tw-mr-2"}),(0,i.jsx)("button",{id:"search-input-clear-btn",name:"clear-btn",type:"button",onClick:this.onClickClear,children:(0,i.jsx)("i",{className:"material-symbols-outlined tw-text-xl tw-align-middle tw-self-center",children:"close"})}),(0,i.jsx)("input",{className:"tw-bg-transparent tw-w-full",id:"search-input",name:"search-input",type:"textbox",onChange:this.onInputChanged,value:this.state.keyword}),(0,i.jsx)("label",{htmlFor:"search-input"})]}),(0,i.jsx)("div",{className:"".concat(w().results),children:(0,i.jsx)(b,{items:this.state.results})})]})}constructor(t){super(t),this.mDisposables=[],this.state={keyword:"",results:null},this.componentWillUnmount=this.componentWillUnmount.bind(this),this.componentDidMount=this.componentDidMount.bind(this),this.onSearchInput=this.onSearchInput.bind(this),this.onSearchOutput=this.onSearchOutput.bind(this),this.onClickSearch=this.onClickSearch.bind(this),this.onClickClear=this.onClickClear.bind(this),this.onInputChanged=this.onInputChanged.bind(this),this.onSubmit=this.onSubmit.bind(this)}}v.contextType=o.Context;var x=v},9961:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return c}});var i=r(7437),n=r(2265),o=r(5313),s=r(495),a=r(198),l=r(3656);function c(t){var e;let{children:r,label:c,refCount:u,slug:m,depth:d}=t,h=(0,o.usePathname)(),_=null!=h&&(null===(e=h.split("/")[d+1])||void 0===e?void 0:e.toUpperCase())===c.toUpperCase(),g=null==r,[p,b]=(0,n.useState)(!_||g),f=(0,n.useContext)(a.Context);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"\n              tw-flex tw-flex-row tw-justify-start\n              tw-mb-1\n              ".concat(d<1?"tw-font-bold":"tw-font-normal","\n              ").concat(d<1?"mobile:tw-text-xl tw-text-lg":d<2?"mobile:tw-text-lg tw-text-lg":"mobile:tw-text-base tw-text-base","\n           "),children:(0,i.jsxs)("button",{className:"tw-flex tw-flex-row tw-grow",onClick:t=>{b(!p)},children:[(0,i.jsx)("div",{className:"tw-self-center tw-w-6",children:g?(0,i.jsx)(i.Fragment,{}):p?(0,i.jsx)(l.jfD,{}):(0,i.jsx)(l.ZXJ,{})}),(0,i.jsx)(s.Z,{className:"tw-font-sans hover:tw-font-bold tw-align-baseline\n                         ".concat(_?"tw-text-color-primary":"tw-text-color-text "),href:m,onClick:()=>{null==f||f.statemgr.closeAll()},children:"".concat(c).concat(u>0?" (".concat(u,")"):"")})]})}),!p&&(0,i.jsx)("div",{className:"tw-border-l-2 tw-ml-1.5 tw-pl-1.5",children:r})]})}},6960:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return s}});var i=r(7437),n=r(2265),o=r(198);function s(t){let{children:e}=t,[r,s]=(0,n.useState)(!1),a=(0,n.useContext)(o.Context);return(0,n.useEffect)(()=>{let t=[];return t.push(null==a?void 0:a.statemgr.registMenuEvent(t=>{s(t)})),()=>{t.map(t=>null==t?void 0:t.dispose())}},[]),(0,i.jsx)(i.Fragment,{children:r&&e})}},4626:function(t,e,r){"use strict";r.r(e),r.d(e,{Tooltip:function(){return l},WithTooltip:function(){return c}});var i=r(7437),n=r(2265),o=r(5967),s=r(5726),a=r.n(s);function l(t){let{hoverRef:e}=t,[r,s]=(0,n.useState)(),[l,c]=(0,n.useState)(),[u,m]=(0,n.useState)(),[d,h]=(0,n.useState)({top:"auto",left:"auto",right:"auto"}),_=(0,n.useRef)(!0),g=t=>t.current,p=t=>{if(null==e.current)return;let r=e.current,i=t.target,n={top:t.offsetY+i.offsetTop,left:t.offsetX+i.offsetLeft,right:"auto"};r.clientWidth-n.left<r.clientWidth/3?(n.right=r.clientWidth-n.left,n.left="auto",m(!1)):m(!0),s(i.innerHTML),c(!1),setTimeout(()=>{g(_)||(h(n),c(!0))},100)},b=t=>{_.current=!1},f=t=>{_.current=!0,c(!1)};return(0,n.useEffect)(()=>{let t=[],r=e.current,i=t=>b(t),n=(0,o.P2)(t=>p(t),100),s=t=>f(t);return r.querySelectorAll(".tooltip-hover").forEach(e=>{e.addEventListener("mouseenter",i),e.addEventListener("mousemove",n),e.addEventListener("mouseleave",s),t.push(()=>{e.removeEventListener("mouseenter",i),e.removeEventListener("mousemove",n),e.removeEventListener("mouseleave",s)})}),()=>{t.forEach(t=>t())}},[]),(0,i.jsx)("div",{className:"".concat(a().tooltip," ").concat(l?a().go:""," ").concat(u?a().left:a().right," "),style:{position:"absolute",...d},children:r})}function c(t){let{children:e}=t,r=(0,n.useRef)(null);return(0,i.jsxs)("div",{className:"tw-relative",ref:r,children:[e,(0,i.jsx)(l,{hoverRef:r})]})}},495:function(t,e,r){"use strict";r.d(e,{Z:function(){return s}});var i=r(7437),n=r(5250),o=r.n(n),s=t=>{let{children:e,href:r,target:n="_self",rel:s,className:a,key:l,onClick:c}=t;return"_blank"==n&&(s="noopener noreferrer"),(0,i.jsx)(o(),{className:a,href:void 0===r?"":r,rel:s,target:n,onClick:c,prefetch:!1,children:e},l)}},1355:function(){},9259:function(t){t.exports={toggleBtn:"darkmode-toggle_toggleBtn__XO5La"}},2769:function(t){t.exports={masthead:"masthead_masthead__zVIwm","menu-btn":"masthead_menu-btn__tZ2_W","menu-lines":"masthead_menu-lines__iNcj5",line:"masthead_line__AM5zP",change:"masthead_change__yYYz8",line1:"masthead_line1__NaE01",line2:"masthead_line2__ai3cP",line3:"masthead_line3__g18ZL",animate:"masthead_animate__G8Cab",rotateR:"masthead_rotateR__nudh_",fade:"masthead_fade__NdRim",rotateL:"masthead_rotateL__KcIB6"}},2521:function(t){t.exports={"search-popup":"search-popup_search-popup__rQedv",results:"search-popup_results__eZlJ7"}},4290:function(t){t.exports={sidebar:"sidebar_sidebar__gN2ma",leftone:"sidebar_leftone__Y8AG1","category-item-0":"sidebar_category-item-0__Ozjud","category-item-1":"sidebar_category-item-1__fEo_0","category-item-2":"sidebar_category-item-2__dBodK","category-item-3":"sidebar_category-item-3__62hWU","category-item-4":"sidebar_category-item-4__9Rwgb","category-item-5":"sidebar_category-item-5__Lpgt4","category-item-6":"sidebar_category-item-6__j7ipe","category-item-7":"sidebar_category-item-7__WTwuF","category-item-8":"sidebar_category-item-8__FohA3","category-item-9":"sidebar_category-item-9__hpaJF","category-item-10":"sidebar_category-item-10__KzzBR","category-item-11":"sidebar_category-item-11__B2v41","category-item-12":"sidebar_category-item-12__KW28u","category-item-13":"sidebar_category-item-13__uRtYi","category-item-14":"sidebar_category-item-14__vYYlv","category-item-15":"sidebar_category-item-15__MPn5y","category-item-16":"sidebar_category-item-16__1sIHL","category-item-17":"sidebar_category-item-17__z2_Hf","category-item-18":"sidebar_category-item-18__LkSa3","category-item-19":"sidebar_category-item-19__HPzAK","category-item-20":"sidebar_category-item-20__mcgBU","category-item-21":"sidebar_category-item-21__6aVPU","category-item-22":"sidebar_category-item-22__WQCyO","category-item-23":"sidebar_category-item-23__vq0Vu","category-item-24":"sidebar_category-item-24__qzatx","category-item-25":"sidebar_category-item-25__gXDOM","category-item-26":"sidebar_category-item-26__olnp5","category-item-27":"sidebar_category-item-27__ODXsp","category-item-28":"sidebar_category-item-28__XYFiI","category-item-29":"sidebar_category-item-29__zkZK_","category-item-30":"sidebar_category-item-30__iL7VH","category-item-31":"sidebar_category-item-31__Za_xN","category-item-32":"sidebar_category-item-32__TjLOx","category-item-33":"sidebar_category-item-33___Be4s","category-item-34":"sidebar_category-item-34__3F4S0","category-item-35":"sidebar_category-item-35__TpLIA","category-item-36":"sidebar_category-item-36__IhCjt","category-item-37":"sidebar_category-item-37__6mPwU","category-item-38":"sidebar_category-item-38__rrdQi","category-item-39":"sidebar_category-item-39__HfwHj","category-item-40":"sidebar_category-item-40__c3Bov"}},5726:function(t){t.exports={tooltip:"tooltip_tooltip__5rF2R",go:"tooltip_go__aEkNn",left:"tooltip_left__0bgo3",right:"tooltip_right__Id7PU"}}},function(t){t.O(0,[929,712,700,612,198,983,971,69,744],function(){return t(t.s=2863)}),_N_E=t.O()}]);