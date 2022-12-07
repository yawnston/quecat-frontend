(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[181],{4975:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/query/explain/[planId]",function(){return t(6318)}])},368:function(e,a,t){"use strict";t.d(a,{v:function(){return o},Z:function(){return g}});var o,l,r=t(5893),s=t(5152),n=t.n(s),d=t(7294),i=[{selector:"node",style:{"border-color":"black","border-width":"1px",label:"data(label)"}},{selector:".tag-root",style:{"background-color":"red"}},{selector:".availability-available",style:{"border-color":"greenyellow","border-width":"4px"}},{selector:".availability-certainly-available",style:{"border-color":"darkgreen","border-width":"4px"}},{selector:".availability-ambiguous",style:{"border-color":"orange","border-width":"4px"}},{selector:".availability-removable",style:{"border-color":"red","border-width":"4px"}},{selector:".selection-root",style:{"background-color":"purple"}},{selector:".selection-selected",style:{"background-color":"blue"}},{selector:"edge[label]",style:{"font-weight":"bold",label:"data(label)","curve-style":"bezier","target-arrow-shape":"triangle"}},{selector:"edge.temporary",style:{"line-style":"dashed","line-color":"blue"}},{selector:"node.new",style:{"border-style":"dashed"}},{selector:"edge.new",style:{"line-style":"dashed"}},{selector:"node.no-ids[label]",style:{color:"red"}},{selector:".group-placeholder",style:{label:"data(label)",events:"no",opacity:0}},{selector:".group",style:{label:"data(label)",events:"no",shape:"round-rectangle","border-style":"dashed","background-opacity":.01}},{selector:".group-1",style:{"background-color":"green",color:"green","border-color":"green","padding-right":"8px"}},{selector:".group-2",style:{"background-color":"red",color:"red","border-color":"red","padding-right":"12px"}},{selector:".group-3",style:{"background-color":"purple",color:"purple","border-color":"purple","padding-right":"16px"}},{selector:".group-4",style:{"background-color":"blue",color:"blue","border-color":"blue","padding-right":"20px"}},{selector:".no-group",style:{label:"",events:"no",opacity:.2,"background-color":"red",width:"60px",height:"60px"}}],c=n()(function(){return Promise.all([t.e(856),t.e(907)]).then(t.bind(t,5054))},{loadableGenerated:{webpack:function(){return[5054]}},ssr:!1});(l=o||(o={})).Schema="schema",l.Query1="query1",l.Query2="query2";var u=[{data:{id:"mongodb",label:"MongoDB"},classes:"group group-1"},{data:{id:"cassandra",label:"Cassandra"},classes:"group group-2"},{data:{id:"postgres",label:"PostgreSQL"},classes:"group group-3"},{data:{id:"neo4j",label:"Neo4j"},classes:"group group-4"},{data:{id:"100",label:"Customer",parent:"postgres"},position:{x:100,y:100},classes:"selection-root"},{data:{id:"Cassandra100",label:void 0,parent:"cassandra"},position:{x:100,y:100},classes:"group-placeholder"},{data:{id:"Neo4j100",label:void 0,parent:"neo4j"},position:{x:100,y:100},classes:"group-placeholder"},{data:{id:"101",label:"Id",parent:"postgres"},position:{x:0,y:100}},{data:{id:"Cassandra101",label:void 0,parent:"cassandra"},position:{x:0,y:100},classes:"group-placeholder"},{data:{id:"Neo4j101",label:void 0,parent:"neo4j"},position:{x:0,y:100},classes:"group-placeholder"},{data:{id:"102",label:"Name",parent:"postgres"},position:{x:0,y:200},classes:"selection-root"},{data:{id:"Neo4j102",label:void 0,parent:"neo4j"},position:{x:0,y:200},classes:"group-placeholder"},{data:{id:"104",label:"Surname",parent:"postgres"},position:{x:100,y:200}},{data:{id:"Neo4j104",label:void 0,parent:"neo4j"},position:{x:100,y:200},classes:"group-placeholder"},{data:{id:"110",label:"Orders",parent:"cassandra"},position:{x:200,y:0},classes:"selection-selected"},{data:{id:"Neo4j110",label:void 0,parent:"neo4j"},position:{x:200,y:0},classes:"group-placeholder"},{data:{id:"111",label:"Order",parent:"cassandra"},position:{x:300,y:0},classes:"selection-selected"},{data:{id:"Mongo111",label:void 0,parent:"mongodb"},position:{x:300,y:0},classes:"group-placeholder"},{data:{id:"Neo4j111",label:void 0,parent:"neo4j"},position:{x:300,y:0},classes:"group-placeholder"},{data:{id:"112",label:"Number",parent:"cassandra"},position:{x:300,y:-100}},{data:{id:"116",label:"Value",parent:"mongodb"},position:{x:400,y:-100}},{data:{id:"113",label:"Contact",parent:"mongodb"},position:{x:400,y:0}},{data:{id:"114",label:"Type",parent:"mongodb"},position:{x:500,y:0}},{data:{id:"115",label:"Name",parent:"mongodb"},position:{x:500,y:-100}},{data:{id:"117",label:"Items",parent:"mongodb"},position:{x:400,y:100},classes:"selection-selected"},{data:{id:"121",label:"Product",parent:"mongodb"},position:{x:400,y:200},classes:"selection-selected"},{data:{id:"123",label:"Name",parent:"mongodb"},position:{x:500,y:300},classes:"selection-root availability-ambiguous"},{data:{id:"122",label:"Id",parent:"mongodb"},position:{x:400,y:300}},{data:{id:"124",label:"Price",parent:"mongodb"},position:{x:500,y:200}},{data:{source:"100",target:"101",label:"1"}},{data:{source:"100",target:"102",label:"3"}},{data:{source:"100",target:"104",label:"7"}},{data:{source:"110",target:"100",label:"21"}},{data:{source:"110",target:"111",label:"23"}},{data:{source:"117",target:"111",label:"36"}},{data:{source:"117",target:"121",label:"39"}},{data:{source:"121",target:"122",label:"47"}},{data:{source:"121",target:"123",label:"49"}},{data:{source:"121",target:"124",label:"51"}},{data:{source:"111",target:"112",label:"25"}},{data:{source:"111",target:"113",label:"27"}},{data:{source:"113",target:"116",label:"33"}},{data:{source:"113",target:"114",label:"29"}},{data:{source:"114",target:"115",label:"31"}},],b=[{data:{id:"mongodb",label:"MongoDB"},classes:"group group-1"},{data:{id:"neo4j",label:"Neo4j"},classes:"group group-4"},{data:{id:"100",label:"Customer",parent:"neo4j"},position:{x:100,y:0},classes:"selection-root"},{data:{id:"102",label:"Name",parent:"neo4j"},position:{x:0,y:0},classes:"selection-root"},{data:{id:"110",label:"Orders",parent:"neo4j"},position:{x:200,y:0},classes:"selection-selected"},{data:{id:"111",label:"Order",parent:"neo4j"},position:{x:300,y:0},classes:"selection-selected"},{data:{id:"Mongodb111",label:void 0,parent:"mongodb"},position:{x:300,y:0},classes:"group-placeholder"},{data:{id:"117",label:"Items",parent:"mongodb"},position:{x:300,y:100},classes:"selection-selected"},{data:{id:"121",label:"Product",parent:"mongodb"},position:{x:300,y:200},classes:"selection-selected"},{data:{id:"123",label:"Name",parent:"mongodb"},position:{x:300,y:300},classes:"selection-root availability-ambiguous"},{data:{source:"100",target:"102",label:"3"}},{data:{source:"110",target:"100",label:"21"}},{data:{source:"110",target:"111",label:"23"}},{data:{source:"117",target:"111",label:"36"}},{data:{source:"117",target:"121",label:"39"}},{data:{source:"121",target:"123",label:"49"}},],p=[{data:{id:"mongodb",label:"MongoDB"},classes:"group group-1"},{data:{id:"cassandra",label:"Cassandra"},classes:"group group-2"},{data:{id:"postgres",label:"PostgreSQL"},classes:"group group-3"},{data:{id:"100",label:"Customer",parent:"cassandra"},position:{x:0,y:0},classes:"selection-root"},{data:{id:"Postgres100",label:void 0,parent:"postgres"},position:{x:0,y:0},classes:"group-placeholder"},{data:{id:"102",label:"Name",parent:"postgres"},position:{x:0,y:100},classes:"selection-root"},{data:{id:"110",label:"Orders",parent:"cassandra"},position:{x:100,y:0},classes:"selection-selected"},{data:{id:"111",label:"Order",parent:"cassandra"},position:{x:200,y:0},classes:"selection-selected"},{data:{id:"Mongodb111",label:"Order",parent:"mongodb"},position:{x:200,y:0},classes:"group-placeholder"},{data:{id:"117",label:"Items",parent:"mongodb"},position:{x:200,y:100},classes:"selection-selected"},{data:{id:"121",label:"Product",parent:"mongodb"},position:{x:200,y:200},classes:"selection-selected"},{data:{id:"123",label:"Name",parent:"mongodb"},position:{x:200,y:300},classes:"selection-root availability-ambiguous"},{data:{source:"100",target:"102",label:"3"}},{data:{source:"110",target:"100",label:"21"}},{data:{source:"110",target:"111",label:"23"}},{data:{source:"117",target:"111",label:"36"}},{data:{source:"117",target:"121",label:"39"}},{data:{source:"121",target:"123",label:"49"}},],g=function(e){var a=(0,d.useState)(void 0),t=a[0],l=a[1];(0,d.useEffect)(function(){t&&!t.destroyed()&&t.fit()});var s=[];return s=e.contentKind===o.Schema?u:e.contentKind===o.Query1?b:p,(0,r.jsx)(c,{id:"cy",elements:s,style:{width:"100%",height:"100%",borderWidth:"2px",borderColor:"black",borderStyle:"solid"},stylesheet:i,autoungrabify:!0,cy:function(e){l(e)}})}},7015:function(e,a,t){"use strict";t.d(a,{AC:function(){return h},FZ:function(){return g},WC:function(){return x},ZP:function(){return y}});var o=t(5893);t(7294);var l=t(244),r=t(9807),s=t(5605),n=t(6777),d=t(3978),i=t(9417),c=t(918),u=t(1664),b=t.n(u);function p(e,a,t,o,l){return{planId:e,cost:a,databases:t,isDefault:o,queries:l}}var g=[441,829],h=[350,625],x=function(){return[p("268ca404-09ba-4b3b-9584-0ba6ceb8c408",g[0],["Neo4j","MongoDB"],!0,["MATCH (customer:Customer)-[:ORDERED]->(order:Order)\nRETURN customer.name AS customerName, order.number AS orderNumber",'db.order.find({\n  items: {\n    name: "Lord of the Rings"\n  }\n},\n{\n  _id: 0,\n  number: 1,\n  productName: {\n    "$getField": {\n      field: "name",\n      input: {\n        "$first": {\n          "$filter": {\n            input: "$items",\n            cond: {\n              $eq: [\n                "$$this.name",\n                "Lord of the Rings"\n              ]\n            }\n          }\n        }\n      }\n    }\n  }\n})',]),p("b158d3d9-034b-407c-98cb-ac3d9ccf88ab",g[1],["PostgreSQL","Cassandra","MongoDB"],!1,["SELECT id, name\nFROM customer","SELECT customer_id, order_number\nFROM orders",'db.order.find({\n  items: {\n    name: "Lord of the Rings"\n  }\n},\n{\n  _id: 0,\n  number: 1,\n  productName: {\n    "$getField": {\n      field: "name",\n      input: {\n        "$first": {\n          "$filter": {\n            input: "$items",\n            cond: {\n              $eq: [\n                "$$this.name",\n                "Lord of the Rings"\n              ]\n            }\n          }\n        }\n      }\n    }\n  }\n})',]),]};function y(){return(0,o.jsx)(n.Z,{component:c.Z,children:(0,o.jsxs)(l.Z,{sx:{minWidth:650},"aria-label":"execution plans table",children:[(0,o.jsx)(d.Z,{children:(0,o.jsxs)(i.Z,{children:[(0,o.jsx)(s.Z,{children:"Plan\xa0ID"}),(0,o.jsx)(s.Z,{align:"right",children:"Plan\xa0Cost"}),(0,o.jsx)(s.Z,{align:"right",children:"Databases\xa0Used"}),(0,o.jsx)(s.Z,{align:"right",children:"More\xa0Details"})]})}),(0,o.jsx)(r.Z,{children:x().map(function(e){return(0,o.jsxs)(i.Z,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[(0,o.jsxs)(s.Z,{component:"th",scope:"row",children:[e.planId,e.isDefault?" (default)":""]}),(0,o.jsx)(s.Z,{align:"right",children:e.cost}),(0,o.jsx)(s.Z,{align:"right",children:e.databases.join(", ")}),(0,o.jsx)(s.Z,{align:"right",children:(0,o.jsx)(b(),{href:"explain/".concat(e.planId),children:"Plan\xa0Details"})})]},e.planId)})})]})})}},6318:function(e,a,t){"use strict";t.r(a);var o=t(5893),l=t(9072),r=t(2851),s=t(9144),n=t(5084),d=t(1953),i=t(1664),c=t.n(i),u=t(1163),b=t(7294),p=t(368),g=t(7015),h=function(){var e=(0,u.useRouter)().query.planId,a="268ca404-09ba-4b3b-9584-0ba6ceb8c408"===e?p.v.Query1:p.v.Query2,t=(0,g.WC)().find(function(a){return a.planId===e}),i=(0,g.WC)().findIndex(function(a){return a.planId===e}),h=(0,b.useReducer)(function(e){return e+1},0),x=(h[0],h[1]),y=[];return y.push((0,o.jsx)(l.ZP,{item:!0,children:(0,o.jsxs)("div",{children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("b",{children:"Plan ID: "}),e]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("b",{children:"Plan cost: "}),null==t?void 0:t.cost]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("b",{children:"Databases used: "}),null==t?void 0:t.databases.join(", ")]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("b",{children:"Is default plan: "}),(null==t?void 0:t.isDefault)?"Yes":"No"]})]})})),null==t||t.databases.forEach(function(a,s){y.push((0,o.jsx)(l.ZP,{item:!0,width:"100%",children:(0,o.jsx)(r.Z,{label:a,defaultValue:null==t?void 0:t.queries[s],multiline:!0,fullWidth:!0,spellCheck:!1,maxRows:"268ca404-09ba-4b3b-9584-0ba6ceb8c408"===e?12:7,minRows:"268ca404-09ba-4b3b-9584-0ba6ceb8c408"===e?12:7})}))}),y.push((0,o.jsx)(l.ZP,{item:!0,children:(0,o.jsxs)(s.Z,{spacing:2,direction:"row",children:[(0,o.jsx)(n.Z,{variant:"contained",children:(0,o.jsx)(c(),{href:"/query/execute",children:"Execute plan"})}),(0,o.jsx)(n.Z,{variant:"outlined",onClick:function(){g.FZ[i]=g.AC[i],x()},children:"Recalculate plan cost"}),(0,o.jsx)(n.Z,{variant:"outlined",children:(0,o.jsx)(c(),{href:"/query/explain",children:"Back"})})]})})),(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(d.Z,{sx:{flexGrow:1,height:"100%"},children:(0,o.jsxs)(l.ZP,{container:!0,columnSpacing:2,sx:{height:"100%"},children:[(0,o.jsx)(l.ZP,{item:!0,xs:6,children:(0,o.jsx)(p.Z,{schemaCategory:void 0,contentKind:a})}),(0,o.jsx)(l.ZP,{item:!0,xs:6,children:(0,o.jsx)(l.ZP,{container:!0,height:"100%",flexDirection:"column",justifyContent:"space-between",alignItems:"stretch",children:y})})]})})})};a.default=h}},function(e){e.O(0,[998,72,278,494,774,888,179],function(){return e(e.s=4975)}),_N_E=e.O()}]);