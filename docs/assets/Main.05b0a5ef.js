import{V as s,g as a}from"./common.52f86a50.js";import{n}from"./index.15b988ae.js";import{O as o}from"./OperateGroup.8cd26c6a.js";const l={props:{itemData:{type:Object,default(){return{}}}}};var u=function(){var e=this,t=e._self._c;return t("div",{staticClass:"demo-cell"},[e._v(" "+e._s(e.itemData.index)+" - "+e._s(e.itemData.id)+" - "+e._s(e.itemData.text)+" ")])},c=[],_=n(l,u,c,!1,null,null,null,null);const d=_.exports,f={name:"DemoSlot",components:{VirtualList:s,Operate:o,Item:d},data(){return{visible:!0,list:a(1e3)}},async mounted(){},methods:{onTest(){console.log("test")}}};var v=function(){var e=this,t=e._self._c;return t("div",{staticClass:"main"},[t("Operate",{attrs:{virtualListRef:e.$refs.virtualListRef,length:e.list.length,visible:e.visible},on:{"update:visible":function(r){e.visible=r}}}),t("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"demo-slot"},[t("VirtualList",{ref:"virtualListRef",attrs:{test:"test",buffer:2,minSize:40,list:e.list,itemKey:"id",stickyHeaderStyle:"height: 40px; background: green;",headerStyle:"height: 80px; background: red",footerStyle:"height: 80px; background: red",stickyFooterStyle:"height: 40px; background: green;"},scopedSlots:e._u([{key:"default",fn:function({itemData:r}){return[t("Item",{attrs:{itemData:r}})]}},{key:"stickyHeader",fn:function(){return[t("div",[e._v("\u60AC\u6D6Eheader")])]},proxy:!0},{key:"header",fn:function(){return[t("div",[e._v("header")])]},proxy:!0},{key:"footer",fn:function(){return[t("div",[e._v("footer")])]},proxy:!0},{key:"stickyFooter",fn:function(){return[t("div",[e._v("\u60AC\u6D6Efooter")])]},proxy:!0}])})],1)],1)},m=[],p=n(f,v,m,!1,null,null,null,null);const x=p.exports;export{x as default};