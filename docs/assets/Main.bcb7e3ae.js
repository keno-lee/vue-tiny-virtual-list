import{V as s,g as r}from"./common.92618f9c.js";import{n as a}from"./index.ee577e4f.js";const l={props:{itemData:{type:Object,default(){return{}}}}};var _=function(){var t=this,e=t._self._c;return e("div",{staticStyle:{"min-height":"44px",display:"flex","align-items":"center","border-bottom":"1px solid #ccc",padding:"6px 10px"},attrs:{contenteditable:"true"}},[e("span",[t._v(t._s(t.itemData.id)+" - "+t._s(t.itemData.text))])])},c=[],d=a(l,_,c,!1,null,null,null,null);const o=d.exports,u={name:"DemoEditable",components:{VirtualList:s,Item:o},data(){return{list:r(200),virtualListRef:{},reactiveData:{renderBegin:0,renderEnd:0}}},mounted(){this.reactiveData=this.$refs.virtualListRef.reactiveData}};var m=function(){var t=this,e=t._self._c;return e("div",{staticClass:"main"},[e("div",{staticStyle:{padding:"10px 0"}},[e("span",[t._v("Total: "+t._s(t.list.length)+" ")]),e("span",[t._v("RenderBegin: "+t._s(t.reactiveData.renderBegin)+" ")]),e("span",[t._v("RenderEnd: "+t._s(t.reactiveData.renderEnd)+" ")])]),e("div",{staticClass:"demo-editable"},[e("VirtualList",{ref:"virtualListRef",attrs:{buffer:5,list:t.list,itemKey:"id",minSize:20},scopedSlots:t._u([{key:"default",fn:function({itemData:i}){return[e("Item",{attrs:{itemData:i}})]}}])})],1)])},v=[],f=a(u,m,v,!1,null,null,null,null);const x=f.exports;export{x as default};
