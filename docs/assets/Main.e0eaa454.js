import{V as i,g as r}from"./common.98ce7bfe.js";import{n as a}from"./index.1100ee0e.js";const l={props:{itemData:{type:Object,default(){return{}}}}};var _=function(){var e=this,t=e._self._c;return t("div",{staticClass:"demo-cell",staticStyle:{height:"40px"}},[e._v(" "+e._s(e.itemData.index)+" - "+e._s(e.itemData.id)+" ")])},c=[],d=a(l,_,c,!1,null,null,null,null);const o=d.exports,u={name:"DemoFixed",components:{Item:o,VirtualList:i},data(){return{list:r(1e3),reactiveData:{renderBegin:0,renderEnd:0}}},mounted(){this.reactiveData=this.$refs.virtualListRef.reactiveData}};var f=function(){var e=this,t=e._self._c;return t("div",{staticClass:"main"},[t("div",{staticStyle:{padding:"10px 0"}},[t("span",[e._v("Total: "+e._s(e.list.length)+" ")]),t("span",[e._v("RenderBegin: "+e._s(e.reactiveData.renderBegin)+" ")]),t("span",[e._v("RenderEnd: "+e._s(e.reactiveData.renderEnd)+" ")])]),t("div",{staticClass:"demo-fixed",staticStyle:{resize:"auto"}},[t("VirtualList",{ref:"virtualListRef",attrs:{buffer:2,list:e.list,itemKey:"id",minSize:40,fixed:""},scopedSlots:e._u([{key:"default",fn:function({itemData:s}){return[t("Item",{attrs:{itemData:s}})]}}])})],1)])},m=[],v=a(u,f,m,!1,null,null,null,null);const D=v.exports;export{D as default};
