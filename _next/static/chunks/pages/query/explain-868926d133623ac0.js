(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[914],{6050:function(n,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/query/explain",function(){return r(8488)}])},7015:function(n,e,r){"use strict";r.d(e,{AC:function(){return m},FZ:function(){return f},WC:function(){return j},ZP:function(){return b}});var i=r(5893);r(7294);var t=r(244),s=r(9807),a=r(5605),c=r(6777),d=r(3978),o=r(9417),l=r(918),u=r(1664),h=r.n(u);function x(n,e,r,i,t){return{planId:n,cost:e,databases:r,isDefault:i,queries:t}}var f=[441,829],m=[350,625],j=function(){return[x("268ca404-09ba-4b3b-9584-0ba6ceb8c408",f[0],["Neo4j","MongoDB"],!0,['MATCH (customer:Customer)-[:ORDERED]->(order:Order)\nWHERE customer.name <> "Peter"\nRETURN customer.name AS customerName, order.number AS orderNumber','db.order.find({}, {\n  _id: 1,\n  "items.name": 1\n})',]),x("b158d3d9-034b-407c-98cb-ac3d9ccf88ab",f[1],["PostgreSQL","Cassandra","MongoDB"],!1,["SELECT id, name\nFROM customer\nWHERE name != 'Peter'","SELECT customer_id, order_number\nFROM orders",'db.order.find({}, {\n  _id: 1,\n  "items.name": 1\n})',]),]};function b(){return(0,i.jsx)(c.Z,{component:l.Z,children:(0,i.jsxs)(t.Z,{sx:{minWidth:650},"aria-label":"execution plans table",children:[(0,i.jsx)(d.Z,{children:(0,i.jsxs)(o.Z,{children:[(0,i.jsx)(a.Z,{children:"Plan\xa0ID"}),(0,i.jsx)(a.Z,{align:"right",children:"Plan\xa0Cost"}),(0,i.jsx)(a.Z,{align:"right",children:"Databases\xa0Used"}),(0,i.jsx)(a.Z,{align:"right",children:"More\xa0Details"})]})}),(0,i.jsx)(s.Z,{children:j().map(function(n){return(0,i.jsxs)(o.Z,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[(0,i.jsxs)(a.Z,{component:"th",scope:"row",children:[n.planId,n.isDefault?" (default)":""]}),(0,i.jsx)(a.Z,{align:"right",children:n.cost}),(0,i.jsx)(a.Z,{align:"right",children:n.databases.join(", ")}),(0,i.jsx)(a.Z,{align:"right",children:(0,i.jsx)(h(),{href:"explain/".concat(n.planId),children:"Plan\xa0Details"})})]},n.planId)})})]})})}},8488:function(n,e,r){"use strict";r.r(e);var i=r(5893),t=r(9072),s=r(9144),a=r(5084),c=r(1664),d=r.n(c),o=r(7015),l=function(){return(0,i.jsxs)(t.ZP,{container:!0,height:"100%",flexDirection:"column",justifyContent:"space-between",alignItems:"stretch",children:[(0,i.jsx)(t.ZP,{item:!0,children:(0,i.jsx)(o.ZP,{})}),(0,i.jsx)(t.ZP,{item:!0,children:(0,i.jsx)(s.Z,{spacing:2,direction:"row-reverse",children:(0,i.jsx)(a.Z,{variant:"contained",children:(0,i.jsx)(d(),{href:"/query",children:"Back to Query"})})})})]})};e.default=l}},function(n){n.O(0,[998,72,494,774,888,179],function(){return n(n.s=6050)}),_N_E=n.O()}]);