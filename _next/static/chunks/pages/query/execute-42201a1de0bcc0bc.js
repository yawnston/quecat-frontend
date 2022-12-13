(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[853],{1848:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/query/execute",function(){return t(410)}])},410:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return E}});var i=t(5893),n=t(9144),s=t(5084),a=t(1953),o=t(3366),c=t(7462),l=t(7294),d=t(6010),u=t(4780),h=t(917),f=t(6622),v=t(5959),m=t(7074),x=t(4867),k=t(1588);function p(e){return(0,x.Z)("MuiCircularProgress",e)}(0,k.Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);let Z=["className","color","disableShrink","size","style","thickness","value","variant"],g=e=>e,y,j,w,P,S=(0,h.F4)(y||(y=g`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),C=(0,h.F4)(j||(j=g`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),_=e=>{let{classes:r,variant:t,color:i,disableShrink:n}=e,s={root:["root",t,`color${(0,f.Z)(i)}`],svg:["svg"],circle:["circle",`circle${(0,f.Z)(t)}`,n&&"circleDisableShrink"]};return(0,u.Z)(s,p,r)},b=(0,m.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver(e,r){let{ownerState:t}=e;return[r.root,r[t.variant],r[`color${(0,f.Z)(t.color)}`]]}})(({ownerState:e,theme:r})=>(0,c.Z)({display:"inline-block"},"determinate"===e.variant&&{transition:r.transitions.create("transform")},"inherit"!==e.color&&{color:(r.vars||r).palette[e.color].main}),({ownerState:e})=>"indeterminate"===e.variant&&(0,h.iv)(w||(w=g`
      animation: ${0} 1.4s linear infinite;
    `),S)),N=(0,m.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),D=(0,m.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver(e,r){let{ownerState:t}=e;return[r.circle,r[`circle${(0,f.Z)(t.variant)}`],t.disableShrink&&r.circleDisableShrink]}})(({ownerState:e,theme:r})=>(0,c.Z)({stroke:"currentColor"},"determinate"===e.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,h.iv)(P||(P=g`
      animation: ${0} 1.4s ease-in-out infinite;
    `),C)),M=l.forwardRef(function(e,r){let t=(0,v.Z)({props:e,name:"MuiCircularProgress"}),{className:n,color:s="primary",disableShrink:a=!1,size:l=40,style:u,thickness:h=3.6,value:f=0,variant:m="indeterminate"}=t,x=(0,o.Z)(t,Z),k=(0,c.Z)({},t,{color:s,disableShrink:a,size:l,thickness:h,value:f,variant:m}),p=_(k),g={},y={},j={};if("determinate"===m){let w=2*Math.PI*((44-h)/2);g.strokeDasharray=w.toFixed(3),j["aria-valuenow"]=Math.round(f),g.strokeDashoffset=`${((100-f)/100*w).toFixed(3)}px`,y.transform="rotate(-90deg)"}return(0,i.jsx)(b,(0,c.Z)({className:(0,d.Z)(p.root,n),style:(0,c.Z)({width:l,height:l},y,u),ownerState:k,ref:r,role:"progressbar"},j,x,{children:(0,i.jsx)(N,{className:p.svg,ownerState:k,viewBox:"22 22 44 44",children:(0,i.jsx)(D,{className:p.circle,style:g,ownerState:k,cx:44,cy:44,r:(44-h)/2,fill:"none",strokeWidth:h})})}))});var R=t(1664),$=t.n(R),E=function(){var e=(0,l.useState)(!1),r=e[0],t=e[1];return setTimeout(function(){return t(!0)},600),r?(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{children:"Retrieved 16 results in 0.42 seconds."}),(0,i.jsxs)(n.Z,{spacing:2,direction:"row",children:[(0,i.jsx)(s.Z,{variant:"contained",children:(0,i.jsx)($(),{href:"/query/results/json",children:"JSON"})}),(0,i.jsx)(s.Z,{variant:"contained",children:"RDF"}),(0,i.jsx)(s.Z,{variant:"contained",children:"Instance Category"})]})]}):(0,i.jsx)(a.Z,{sx:{height:"100%",display:"flex",justifyContent:"center",alignItems:"center"},children:(0,i.jsx)(M,{size:"5rem"})})}}},function(e){e.O(0,[998,774,888,179],function(){return e(e.s=1848)}),_N_E=e.O()}]);