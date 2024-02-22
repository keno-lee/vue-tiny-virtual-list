import{V as A}from"./chunks/VirtualList.c0QhsyoC.js";import{a as p}from"./chunks/common.ag3T3Vnt.js";import{_ as F,o as g,c as y,k as i,t,D as e,I as l,a2 as m,a4 as f,a5 as v,w as E,p as _,q as b,a as o,R as x}from"./chunks/framework.UVXzjgAp.js";import{O as q}from"./chunks/OperateGroup.zxeV3phK.js";import"./chunks/ObserverItem.Ik21bs68.js";const L={props:{itemData:{type:Object,default(){return{}}},index:{type:Number,default:0}}},T={class:"row-item"},R={class:"row-message"};function S(s,n,h,d,a,k){return g(),y("div",T,[i("div",R,t(h.itemData.index)+" - "+t(h.itemData.id)+" - "+t(h.itemData.text),1)])}const z=F(L,[["render",S],["__scopeId","data-v-bccd5458"]]),w={name:"DemoChat",components:{Item:z,VirtualList:A,Operate:q},data(){return{visible:!0,list:[],reactiveData:{renderBegin:0,renderEnd:0},isFirstRender:!0,pageMax:10,page:10,pageSize:20,loading:!1,abortTop:!1,abortBottom:!1,virtualListRef:null}},async created(){const s=await p(this.pageSize,(this.page-1)*this.pageSize),n=await p(this.pageSize,this.page*this.pageSize);this.list=s.concat(n)},mounted(){var s;this.virtualListRef=this.$refs.virtualListRef,this.reactiveData=(s=this.virtualListRef)==null?void 0:s.reactiveData},methods:{async toTop(){if(console.log("toTop"),this.abortBottom=!0,this.loading||this.page<=1){this.loading||(this.abortBottom=!1);return}this.loading=!0;const s=await p(this.pageSize,(this.page-2)*this.pageSize,1e3);if(this.reactiveData.renderEnd>=this.pageSize){this.loading=!1,this.abortTop&&(this.abortBottom=!1,await this.toBottom());return}this.list=s.concat(this.list.slice(0,this.pageSize)),this.abortBottom=!1,this.$nextTick(()=>{var n;(n=this.virtualListRef)==null||n.addedList2Top(s),this.page-=1,this.loading=!1})},async toBottom(){if(console.log("toBottom"),this.abortTop=!0,this.loading||this.page>=this.pageMax){this.loading||(this.abortTop=!1);return}this.loading=!0;const s=await p(this.pageSize,(this.page+1)*this.pageSize,1e3);if(this.reactiveData.renderBegin<this.pageSize){this.loading=!1,this.abortBottom&&(this.abortTop=!1,await this.toTop());return}const n=this.list.splice(0,this.pageSize);this.list=this.list.concat(s),this.abortTop=!1,this.$nextTick(()=>{var h;(h=this.virtualListRef)==null||h.deletedList2Top(n),this.page+=1,this.loading=!1})},itemResize(){var s;this.isFirstRender&&(this.isFirstRender=!1,(s=this.virtualListRef)==null||s.scrollToBottom())}}},r=s=>(_("data-v-42dfdf79"),s=s(),b(),s),I={class:"main"},V={style:{padding:"10px 0"}},O=r(()=>i("span",null,"   ",-1)),G=r(()=>i("span",null,"   ",-1)),M={class:"demo-chat"},N=r(()=>i("div",{style:{width:"100%",height:"20px",display:"flex","justify-content":"center","align-items":"center","background-color":"chocolate"}}," loading... ",-1)),j=r(()=>i("div",{style:{width:"100%",height:"20px",display:"flex","justify-content":"center","align-items":"center","background-color":"chocolate"}}," loading... ",-1));function P(s,n,h,d,a,k){const c=e("Operate"),C=e("Item"),B=e("VirtualList");return g(),y("div",I,[l(c,{virtualListRef:a.virtualListRef,length:a.list.length,visible:a.visible},null,8,["virtualListRef","length","visible"]),i("div",V,[i("span",null,"Total: "+t(a.list.length),1),O,i("span",null,"RenderBegin: "+t(a.reactiveData.renderBegin),1),G,i("span",null,"RenderEnd: "+t(a.reactiveData.renderEnd),1)]),m(i("div",M,[l(B,{ref:"virtualListRef",list:a.list,itemKey:"index",minSize:60,onToTop:k.toTop,onToBottom:k.toBottom,onItemResize:k.itemResize},v({default:E(({itemData:D,index:u})=>[l(C,{itemData:D,index:u},null,8,["itemData","index"])]),_:2},[a.page>1?{name:"header",fn:E(()=>[N]),key:"0"}:void 0,a.page<a.pageMax?{name:"footer",fn:E(()=>[j]),key:"1"}:void 0]),1032,["list","onToTop","onToBottom","onItemResize"])],512),[[f,a.visible]])])}const $=F(w,[["render",P],["__scopeId","data-v-42dfdf79"]]),K=i("h1",{id:"分页-虚拟列表",tabindex:"-1"},[o("分页-虚拟列表 "),i("a",{class:"header-anchor",href:"#分页-虚拟列表","aria-label":'Permalink to "分页-虚拟列表"'},"​")],-1),J=i("ul",null,[i("li",null,"分页: 列表数据采用上下分页的形式，永远只缓存当前页数据和缓冲数据（例如：pageSize为20时，缓存数据为40）"),i("li",null,"虚拟列表 VirtualList : 缓存的数据渲染仍然采取虚拟列表渲染")],-1),H=i("h2",{id:"基础示例",tabindex:"-1"},[o("基础示例 "),i("a",{class:"header-anchor",href:"#基础示例","aria-label":'Permalink to "基础示例"'},"​")],-1),Q=x("",1),is=JSON.parse('{"title":"分页-虚拟列表","description":"","frontmatter":{},"headers":[],"relativePath":"examples/pagination-virtual/index.md","filePath":"examples/pagination-virtual/index.md"}'),U={name:"examples/pagination-virtual/index.md"},as=Object.assign(U,{setup(s){return(n,h)=>{const d=e("ClientOnly");return g(),y("div",null,[K,J,H,l(d,null,{default:E(()=>[l($)]),_:1}),Q])}}});export{is as __pageData,as as default};