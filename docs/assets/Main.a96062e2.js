import{V as n,g as r}from"./common.c7204277.js";import{n as s}from"./index.aac212f1.js";import{O as l}from"./OperateGroup.b1655f7d.js";const _={props:{itemData:{type:Object,default(){return{}}}}};var o=function(){var e=this,t=e._self._c;return t("div",{staticClass:"demo-cell"},[e._v(" "+e._s(e.itemData.index)+" - "+e._s(e.itemData.id)+" - "+e._s(e.itemData.text)+" ")])},c=[],v=s(_,o,c,!1,null,null,null,null);const d=v.exports,u={name:"DemoOperate",components:{Item:d,VirtualList:n,Operate:l},data(){return{visible:!0,list:r(1e3),reactiveData:{renderBegin:0,renderEnd:0}}},mounted(){this.reactiveData=this.$refs.virtualListRef.reactiveData}};var m=function(){var e=this,t=e._self._c;return t("div",{staticClass:"main"},[t("Operate",{attrs:{virtualListRef:e.$refs.virtualListRef,length:e.list.length,visible:e.visible},on:{"update:visible":function(a){e.visible=a}}}),t("div",{staticStyle:{padding:"10px 0"}},[t("span",[e._v("Total: "+e._s(e.list.length)+" ")]),t("span",[e._v("RenderBegin: "+e._s(e.reactiveData.renderBegin)+" ")]),t("span",[e._v("RenderEnd: "+e._s(e.reactiveData.renderEnd)+" ")])]),t("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"demo-operate",staticStyle:{resize:"auto"}},[t("VirtualList",{ref:"virtualListRef",attrs:{buffer:2,list:e.list,itemKey:"id",minSize:40},scopedSlots:e._u([{key:"default",fn:function({itemData:a}){return[t("Item",{attrs:{itemData:a}})]}}])})],1)],1)},f=[],p=s(u,m,f,!1,null,"6951b910",null,null);const h=p.exports;export{h as default};
