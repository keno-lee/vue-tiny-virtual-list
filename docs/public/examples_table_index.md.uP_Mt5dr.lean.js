import{V as D}from"./chunks/VirtualList.c0QhsyoC.js";import{g as _}from"./chunks/common.ag3T3Vnt.js";import{_ as g,o as e,c as E,k as s,t as a,p as y,q as F,D as k,I as l,w as p,a as c,R as v}from"./chunks/framework.UVXzjgAp.js";import"./chunks/ObserverItem.Ik21bs68.js";const A={props:{itemData:{type:Object,default(){return{}}},index:{type:Number,default:0}}},b=i=>(y("data-v-b0b3a3a4"),i=i(),F(),i),f={class:"table-row"},x={class:"table-cell",style:{width:"200px",position:"sticky",left:"0","background-color":"var(--vp-sidebar-bg-color)",overflow:"hidden"}},q={class:"table-cell",style:{width:"600px"}},w={class:"table-cell",style:{width:"600px"}},I=b(()=>s("div",{class:"table-cell",style:{width:"100px",position:"sticky",right:"0","background-color":"var(--vp-sidebar-bg-color)"}}," 操作 ",-1));function L(i,r,n,h,t,o){return e(),E("div",f,[s("div",x,a(n.index)+" - "+a(n.itemData.id),1),s("div",q,a(n.itemData.text),1),s("div",w,a(n.itemData.text),1),I])}const V=g(A,[["render",L],["__scopeId","data-v-b0b3a3a4"]]),$={name:"DemoTable",components:{VirtualList:D,Item:V},data(){return{list:[],reactiveData:{renderBegin:0,renderEnd:0}}},mounted(){this.reactiveData=this.$refs.virtualListRef.reactiveData,this.list=_(1e3)}},d=i=>(y("data-v-75b8f7a3"),i=i(),F(),i),S={class:"main"},T={style:{padding:"10px 0"}},R=d(()=>s("span",null,"   ",-1)),N=d(()=>s("span",null,"   ",-1)),P={class:"demo-table"},O=d(()=>s("div",{class:"header"},[s("div",{class:"header-cell",style:{width:"200px",position:"sticky",left:"0","background-color":"cyan",overflow:"hidden"}}," id "),s("div",{class:"header-cell",style:{width:"600px"}},"Column1"),s("div",{class:"header-cell",style:{width:"600px"}},"Column2"),s("div",{class:"header-cell",style:{width:"100px",position:"sticky",right:"0","background-color":"cyan"}}," 操作 ")],-1));function z(i,r,n,h,t,o){const C=k("Item"),B=k("VirtualList");return e(),E("div",S,[s("div",T,[s("span",null,"Total: "+a(t.list.length),1),R,s("span",null,"RenderBegin: "+a(t.reactiveData.renderBegin),1),N,s("span",null,"RenderEnd: "+a(t.reactiveData.renderEnd),1)]),s("div",P,[l(B,{ref:"virtualListRef",list:t.list,minSize:40,itemKey:"id"},{default:p(({itemData:u,index:m})=>[l(C,{itemData:u,index:m},null,8,["itemData","index"])]),stickyHeader:p(()=>[O]),_:1},8,["list"])])])}const j=g($,[["render",z],["__scopeId","data-v-75b8f7a3"]]),H=s("h1",{id:"表格",tabindex:"-1"},[c("表格 "),s("a",{class:"header-anchor",href:"#表格","aria-label":'Permalink to "表格"'},"​")],-1),K=s("h2",{id:"基础示例",tabindex:"-1"},[c("基础示例 "),s("a",{class:"header-anchor",href:"#基础示例","aria-label":'Permalink to "基础示例"'},"​")],-1),J=v("",1),X=JSON.parse('{"title":"表格","description":"","frontmatter":{},"headers":[],"relativePath":"examples/table/index.md","filePath":"examples/table/index.md"}'),M={name:"examples/table/index.md"},Y=Object.assign(M,{setup(i){return(r,n)=>{const h=k("ClientOnly");return e(),E("div",null,[H,K,l(h,null,{default:p(()=>[l(j)]),_:1}),J])}}});export{X as __pageData,Y as default};
