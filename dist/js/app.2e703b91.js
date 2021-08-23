(function(t){function e(e){for(var a,i,c=e[0],l=e[1],s=e[2],m=0,p=[];m<c.length;m++)i=c[m],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(p.length)p.shift()();return r.push.apply(r,s||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,c=1;c<n.length;c++){var l=n[c];0!==o[l]&&(a=!1)}a&&(r.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},o={app:0},r=[];function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var s=0;s<c.length;s++)e(c[s]);var u=l;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},4360:function(t,e,n){"use strict";var a=n("2b0e"),o=n("2f62"),r=n("1da1"),i=(n("96cf"),n("bc3a")),c=n.n(i),l={namespaced:!0,state:{token:null,user:null},getters:{authenticated:function(t){return t.token&&t.user},user:function(t){return t.user}},mutations:{SET_TOKEN:function(t,e){t.token=e},SET_USER:function(t,e){t.user=e}},actions:{login:function(t,e){return Object(r["a"])(regeneratorRuntime.mark((function n(){var a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t.dispatch,u.dispatch("setError",!1),n.prev=2,n.next=5,c.a.post("auth/login",e);case 5:return o=n.sent,n.abrupt("return",a("attempt",o.data.access_token));case 9:n.prev=9,n.t0=n["catch"](2),u.dispatch("setError","로그인 정보를 확인해 주세요.");case 12:case"end":return n.stop()}}),n,null,[[2,9]])})))()},attempt:function(t,e){return Object(r["a"])(regeneratorRuntime.mark((function n(){var a,o,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=t.commit,o=t.state,e&&a("SET_TOKEN",e),o.token){n.next=4;break}return n.abrupt("return");case 4:return n.prev=4,n.next=7,c()({url:"/api/v1/users/me",method:"GET",headers:{Authorization:"Bearer "+e}});case 7:r=n.sent,r.data.result&&a("SET_USER",r.data.data[0]),n.next=15;break;case 11:n.prev=11,n.t0=n["catch"](4),a("SET_TOKEN",null),a("SET_USER",null);case 15:case"end":return n.stop()}}),n,null,[[4,11]])})))()},logout:function(t){var e=t.commit;return c.a.post("auth/logout").then((function(){e("SET_TOKEN",null),e("SET_USER",null)}))}}},s={namespaced:!0,state:{allContact:[],myContact:[],companyContact:[],groupContact:[],personalContact:[],publicContact:[],publicDataList:[]},getters:{allContact:function(t){return t.allContact},myContact:function(t){return t.myContact},companyContact:function(t){return t.companyContact},groupContact:function(t){return t.groupContact},publicContact:function(t){return t.publicContact},personalContact:function(t){return t.personalContact},publicDataList:function(t){return t.publicDataList}},mutations:{SET_AllContact:function(t,e){t.allContact=e},SET_MyContact:function(t,e){t.myContact=e},SET_CompanyContact:function(t,e){t.companyContact=e},SET_GroupContact:function(t,e){t.groupContact=e},SET_PublicContact:function(t,e){t.publicContact=e},SET_PersonalContact:function(t,e){t.personalContact=e},SET_PublicDataList:function(t,e){t.publicDataList=e}},actions:{loadAllContact:function(t){var e=t.commit;c()({method:"GET",url:"/api/v1/contacts",headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){return t.data})).then((function(t){e("SET_AllContact",t)}))},loadMyContact:function(t){var e=t.commit;c()({method:"GET",url:"/api/v1/users/my-contacts",headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){return t.data})).then((function(t){e("SET_MyContact",t)}))},loadCompanyContact:function(t){var e=t.commit;c()({method:"GET",url:"/api/v1/companies",headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){return t.data})).then((function(t){e("SET_CompanyContact",t)}))},loadGroupContact:function(t){var e=t.commit;c()({method:"GET",url:"/api/v1/group",headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){return t.data})).then((function(t){e("SET_GroupContact",t)}))},loadPublicContact:function(t){var e=t.commit;c()({method:"GET",url:"/api/v1/public-contacts",headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){return t.data})).then((function(t){e("SET_PublicContact",t)}))},loadPersonalContact:function(t){var e=t.commit;c()({method:"GET",url:"/api/v1/personal-contacts",headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){return t.data})).then((function(t){e("SET_PersonalContact",t)}))},loadPublicDataList:function(t){var e=t.commit;c()({url:"/api/v1/public",method:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){return t.data.data})).then((function(t){e("SET_PublicDataList",t)}))}}};a["default"].use(o["a"]);var u=e["a"]=new o["a"].Store({state:{errors:!1,publicData:[]},getters:{errors:function(t){return t.errors}},mutations:{SET_ERROR:function(t,e){t.errors=e}},actions:{setError:function(t,e){var n=t.commit;n("SET_ERROR",e)}},modules:{auth:l,contact:s}})},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),o=n("ce5b"),r=n.n(o),i=n("fcf4"),c=(n("bf40"),n("bc3a")),l=n.n(c),s=(n("5363"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[t.token?n("v-navigation-drawer",{attrs:{color:"primary",dark:"",app:"",clipped:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",{attrs:{nav:"",dense:""}},[n("ListGroup",{attrs:{items:t.medias}}),n("ListGroup",{attrs:{items:t.platforms}})],1)],1):t._e(),t.token?n("v-app-bar",{attrs:{color:"primary",app:"","clipped-left":"",dark:""}},[n("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),n("v-toolbar-title",[t._v(" Curator9 Console ")]),n("v-spacer"),n("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[n("v-btn",t._g({attrs:{icon:""}},a),[n("v-icon",[t._v("mdi-account")])],1)]}}],null,!1,2166920326)},[n("v-list",{attrs:{dense:""}},[n("v-list-item",[n("v-list-item-avatar",{attrs:{color:"primary",size:"48"}},[n("span",{staticClass:"white--text headline"},[t._v(" 관리 ")])]),n("v-list-item-content",[n("v-list-item-title",{staticClass:"title"},[t._v(t._s(t.name)+"님")]),n("v-list-item-subtitle",[t._v(t._s(t.email))])],1)],1),n("v-divider",{staticClass:"my-2"}),n("v-list-item",[n("v-list-item-icon",[n("v-icon",[t._v("mdi-logout")])],1),n("v-list-item-content",[n("v-list-item-title",[t._v("로그아웃")])],1)],1)],1)],1)],1):t._e(),n("v-main",[n("router-view")],1)],1)}),u=[],m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._l(t.items,(function(e){return n("v-list-group",{key:e.title,attrs:{"active-class":"white--text","prepend-icon":e.action,"no-action":""},scopedSlots:t._u([{key:"activator",fn:function(){return[n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.title)}})],1)]},proxy:!0}],null,!0)},t._l(e.item,(function(e,a){return n("v-list-item",{key:"child"+a,attrs:{to:e.link,"active-class":"white--text","sub-group":""}},[n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.title)}})],1)],1)})),1)})),1)},p=[],d={props:{items:[]}},f=d,v=n("2877"),h=Object(v["a"])(f,m,p,!1,null,"bf597624",null),b=h.exports,_={components:{ListGroup:b},data:function(){return{token:"",id:"",name:"",state:"",email:"",drawer:null,items:[{subheader:"관리",menus:[{icon:"mdi-home",text:"Platform",link:"/"}]},{menus:[{icon:"mdi-map-marker-multiple",text:"Media",link:"/medias"}]}],medias:[{action:"mdi-golf",item:[{title:"매체 키워드 관리",link:"/"},{title:"매체 채널 관리",link:"/media-channel"},{title:"수집 정보 리스트",link:"/media-article-list"}],title:"골프몽"}],platforms:[{action:"mdi-cog",item:[{title:"플랫폼 관리",link:"/platform"},{title:"플랫폼 계정 관리",link:"/platform-account"}],title:"설정"}]}},mounted:function(){this.token=localStorage.getItem("token"),this.id=localStorage.getItem("id")},methods:{reload:function(t){location.href=t}}},g=_,y=Object(v["a"])(g,s,u,!1,null,null,null),k=y.exports,C=n("8c4f"),S=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{id:"inspire"}},[n("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[n("v-row",{staticStyle:{"max-width":"initial"},attrs:{align:"center",justify:"center"}},[n("v-col",{staticClass:"px-6",staticStyle:{"max-width":"480px"},attrs:{cols:"12",sm:"8",md:"4"}},[n("v-card",{staticClass:"elevation-12"},[n("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[n("v-toolbar-title",[t._v("Curator9 Console 로그인")])],1),n("v-card-text",[n("v-form",{ref:"form",attrs:{"lazy-validation":""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submit.apply(null,arguments)}}},[n("v-text-field",{attrs:{label:"ID","prepend-icon":"email",rules:t.emailRules,color:"primary",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),n("v-text-field",{attrs:{label:"Password",type:"password","prepend-icon":"lock",rules:t.passwordRules,color:"primary",required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"primary",text:""},on:{click:t.submit}},[t._v("로그인")])],1)],1)],1)],1)],1)],1)},E=[],w=(n("d1e78"),{data:function(){return{email:"",emailRules:[function(t){return!!t||"아이디를 입력해 주세요."}],password:"",passwordRules:[function(t){return!!t||"비밀번호를 입력해 주세요."}],token:"",grant_type:"password",client_id:"93fff73e-62d6-44c8-82a3-da3e2f5275b8",client_secret:"OsDF2iplB0PbXNm3nvcJpcZdaYJN0tj4A4pqicl5",scope:"*"}},methods:{submit:function(){var t=this;if(this.$refs.form.validate())return this.axios.post("oauth/token",{grant_type:this.grant_type,client_id:this.client_id,client_secret:this.client_secret,username:this.email,password:this.password,scope:this.scope}).then((function(e){if(t.loading=!1,t.token=e.data.data,!t.token)return alert("아이디나 비밀번호를 확인해주세요."),!1;localStorage.setItem("token",t.token)})).catch((function(t){console.log(t)}))}}}),x=w,T=Object(v["a"])(x,S,E,!1,null,null,null),O=T.exports,A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("hello-world")},P=[],R=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:""}},[n("v-breadcrumbs",{attrs:{items:t.breadcrumbs}}),n("v-card-title",{staticClass:"mb-5"},[t._v(" 진행 현황 : "+t._s(t.complete)+" / "+t._s(t.total)+" "),n("v-progress-linear",{attrs:{height:"25"},model:{value:t.result,callback:function(e){t.result=e},expression:"result"}},[n("strong",[t._v(t._s(Math.ceil(t.result))+"%")])])],1),(t.state,n("v-row",t._l(t.items,(function(e,a){return n("v-col",{key:a,attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[n("v-card",[n("v-card-title",[t._v(" "+t._s(e.name)+" ")]),n("v-card-subtitle",[t._v(" "+t._s(e.email)+" ")]),n("v-card-actions",[n("v-btn",{attrs:{color:"purple",text:""},on:{click:function(n){return t.show(e.id)}}},[t._v(" 상세보기 ")])],1)],1)],1)})),1))],1)},j=[],I={data:function(){return{loading:!1,breadcrumbs:[{text:"매체 키워드 관리",disabled:!1,href:"/"}],items:[],user_items:[],state:"",complete:"",total:"",result:""}},mounted:function(){this.state=localStorage.getItem("state")},methods:{show:function(t){this.$router.push({name:"UserPlacesShow",params:{id:t}})}}},L=I,G=Object(v["a"])(L,R,j,!1,null,"af70886a",null),z=G.exports,B={name:"Home",components:{HelloWorld:z}},D=B,M=Object(v["a"])(D,A,P,!1,null,null,null),N=M.exports;a["default"].use(C["a"]);var U=[{path:"/login",name:"Login",component:O,beforeEnter:function(t,e,n){if(localStorage.getItem("token"))return n({name:"/"});n()}},{path:"/",name:"Home",component:N,meta:{requiresAuth:!0}}],$=new C["a"]({mode:"history",base:"/",routes:U});$.beforeEach((function(t,e,n){if(t.matched.some((function(t){return t.meta.requiresAuth}))){if(!localStorage.getItem("token"))return n({name:"Login"});n()}n()}));var q=$,K=n("4360");n("66c6"),a["default"].use(r.a),window.axios=n("bc3a"),l.a.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",l.a.defaults.headers.common["Accept"]="application/json",l.a.defaults.headers.common["Access-Control-Allow-Origin"]="*",l.a.defaults.headers.common["Content-Type"]="application/json",l.a.defaults.baseURL=Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_AXIOS_BASE_URL,l.a.defaults.headers.common["Authorization"]="Bearer "+localStorage.getItem("token"),a["default"].config.productionTip=!1,a["default"].prototype.axios=window.axios,K["a"].dispatch("auth/attempt",localStorage.getItem("token")).then((function(){new a["default"]({vuetify:new r.a({theme:{themes:{light:{primary:"#0A0C0C"},dark:{primary:i["a"].purple.darken3}}},icons:{iconfont:"mdiSvg"}}),router:q,store:K["a"],render:function(t){return t(k)}}).$mount("#app")}))},"66c6":function(t,e,n){"use strict";n.r(e);var a=n("bc3a"),o=n.n(a),r=n("4360");r["a"].subscribe((function(t){switch(t.type){case"auth/SET_TOKEN":t.payload?(o.a.defaults.headers.common["Authorization"]="Bearer ".concat(t.payload),localStorage.setItem("token",t.payload)):(o.a.defaults.headers.common["Authorization"]=null,localStorage.removeItem("token",null));break}}))}});
//# sourceMappingURL=app.2e703b91.js.map