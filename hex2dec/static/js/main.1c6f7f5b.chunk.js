(this.webpackJsonpreact=this.webpackJsonpreact||[]).push([[0],{11:function(e,t,c){},15:function(e,t,c){"use strict";c.r(t);var r=c(0),a=c.n(r),n=c(6),u=c.n(n),s=c(5),l=(c(11),c(4)),o=c(17),j=c(1);function i(){var e=a.a.useState("hex"),t=Object(s.a)(e,2),c=t[0],r=t[1],n=a.a.useState("dec"),u=Object(s.a)(n,2),i=u[0],v=u[1],b=a.a.useRef(),h=a.a.useRef();return Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)("h1",{children:"Hex2Dec"}),Object(j.jsx)("input",{type:"text",ref:b,onChange:function(){if("hex"===c)try{var e=b.current.value,t=Object(l.hexToDec)(e);h.current.value=t}catch(n){console.log("Error",n)}else{var r=b.current.value,a=Object(l.decToHex)(r);h.current.value=a}},placeholder:c}),Object(j.jsx)("div",{className:"swap-btn",onClick:function(){var e=c;r(i),v(e);var t=h.current.value;h.current.value=b.current.value,b.current.value=t,b.current.focus()},children:Object(j.jsx)(o.a,{})}),Object(j.jsx)("input",{type:"text",ref:h,placeholder:i})]})}var v=document.getElementById("root");u.a.render(Object(j.jsx)(r.StrictMode,{children:Object(j.jsx)(i,{})}),v)}},[[15,1,2]]]);
//# sourceMappingURL=main.1c6f7f5b.chunk.js.map