import{V as r,a}from"./common.c7204277.js";import{n}from"./index.aac212f1.js";import{O as l}from"./OperateGroup.b1655f7d.js";const o={props:{itemData:{type:Object,default(){return{}}}}};var c=function(){var e=this,t=e._self._c;return t("div",{staticClass:"demo-cell"},[e._v(" "+e._s(e.itemData.index)+" - "+e._s(e.itemData.id)+" - "+e._s(e.itemData.text)+" ")])},_=[],d=n(o,c,_,!1,null,"a60ccfd9",null,null);const u=d.exports,f={name:"DemoChat",components:{Item:u,VirtualList:r,Operate:l},data(){return{visible:!0,list:[],reactiveData:{renderBegin:0,renderEnd:0},isFirstRender:!0,pageMax:5,page:5,pageSize:40,loading:!1}},async created(){this.list=await a(this.pageSize,(this.page-1)*this.pageSize)},mounted(){this.reactiveData=this.$refs.virtualListRef.reactiveData},methods:{async toTop(){if(console.log("toTop"),this.loading||this.page<=1)return;this.loading=!0;const s=await a(this.pageSize,(this.page-2)*this.pageSize,1e3);this.list=s.concat(this.list),this.$nextTick(()=>{let e=0;s.forEach(t=>{const i=this.$refs.virtualListRef.getItemSize(t.index);e+=i}),this.$refs.virtualListRef.scrollToOffset(e,!0),this.page-=1,this.loading=!1})},itemResize(){this.isFirstRender&&(this.isFirstRender=!1,this.$refs.virtualListRef.scrollToBottom())}}};var v=function(){var e=this,t=e._self._c;return t("div",{staticClass:"main"},[t("Operate",{attrs:{virtualListRef:e.$refs.virtualListRef,length:e.list.length,visible:e.visible},on:{"update:visible":function(i){e.visible=i}}}),t("div",{staticStyle:{padding:"10px 0"}},[t("span",[e._v("Total: "+e._s(e.list.length)+" ")]),t("span",[e._v("RenderBegin: "+e._s(e.reactiveData.renderBegin)+" ")]),t("span",[e._v("RenderEnd: "+e._s(e.reactiveData.renderEnd)+" ")])]),t("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"demo-chat"},[t("VirtualList",{ref:"virtualListRef",attrs:{list:e.list,itemKey:"index",minSize:60,itemClass:"chat-item"},on:{toTop:e.toTop,itemResize:e.itemResize},scopedSlots:e._u([{key:"default",fn:function({itemData:i}){return[t("Item",{attrs:{itemData:i}})]}},e.page>1?{key:"header",fn:function(){return[t("div",{staticStyle:{width:"100%",height:"20px",display:"flex","justify-content":"center","align-items":"center","background-color":"chocolate"}},[e._v(" loading... ")])]},proxy:!0}:null],null,!0)})],1)],1)},p=[],m=n(f,v,p,!1,null,null,null,null);const x=m.exports;export{x as default};
