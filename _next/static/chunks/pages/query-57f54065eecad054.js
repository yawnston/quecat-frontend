(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[523],{9983:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/query",function(){return t(5518)}])},5518:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return x}});var o=t(5893),r=t(1953),s=t(9072),i=t(2851),c=t(9144),a=t(5084),u=t(1664),d=t.n(u),l=t(368);function h(e,n){if(!(e instanceof n))throw TypeError("Cannot call a class as a function")}var p=function(){function e(n,t){h(this,e),this.objects=n,this.morphisms=t}return e.prototype.renderToCytoscape=function(e){console.log("success!"),this.objects.forEach(function(n){return n.renderToCytoscape(e)})},e}(),f=function(){function e(n,t,o){h(this,e),this.key=n,this.label=t}return e.prototype.renderToCytoscape=function(e){e.add([{data:{id:"one",label:"Node 1",parent:"postgres"},position:{x:0,y:0}},{data:{id:"two",label:"Node 2",parent:"postgres"},position:{x:500,y:50}},{data:{id:"postgres",label:"PostgreSQL"},classes:"group group-1"},{data:{source:"one",target:"two",label:"Edge from Node1 to Node2"}}]),console.log("added items!")},e}(),m=new p([new f(1,"Customer",[])],[]),x=function(){return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(r.Z,{sx:{flexGrow:1,height:"100%"},children:(0,o.jsxs)(s.ZP,{container:!0,columnSpacing:2,sx:{height:"100%"},children:[(0,o.jsx)(s.ZP,{item:!0,xs:6,children:(0,o.jsx)(l.Z,{schemaCategory:m,contentKind:l.v.Schema})}),(0,o.jsx)(s.ZP,{item:!0,xs:6,children:(0,o.jsxs)(s.ZP,{container:!0,height:"100%",flexDirection:"column",justifyContent:"space-between",alignItems:"stretch",children:[(0,o.jsx)(s.ZP,{item:!0,children:(0,o.jsx)(i.Z,{label:"Query",defaultValue:'SELECT {\n    ?customer ordered ?productName ;\n        name ?customerName .\n}\nWHERE {\n    ?product 49 ?productName ;\n        -39/36 ?order .\n    \n    ?order -23/21 ?customer .\n    ?customer 3 ?customerName .\n\n    FILTER(?productName = "Lord of the Rings")\n}',multiline:!0,fullWidth:!0,spellCheck:!1})}),(0,o.jsx)(s.ZP,{item:!0,children:(0,o.jsxs)(c.Z,{spacing:2,direction:"row",children:[(0,o.jsx)(a.Z,{variant:"contained",children:(0,o.jsx)(d(),{href:"/query/execute",children:"Execute"})}),(0,o.jsx)(a.Z,{variant:"outlined",children:(0,o.jsx)(d(),{href:"/query/explain",children:"Explain"})})]})})]})})]})})})}}},function(e){e.O(0,[998,851,72,368,774,888,179],function(){return e(e.s=9983)}),_N_E=e.O()}]);