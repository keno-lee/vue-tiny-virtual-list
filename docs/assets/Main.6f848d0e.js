import{V as s,g as a}from"./common.0589cb63.js";import{n as r}from"./index.dc3e0680.js";import{O as o}from"./OperateGroup.5b13f4dd.js";const l={props:{itemData:{type:Object,default(){return{}}}}};var u=function(){var e=this,t=e._self._c;return t("div",{staticClass:"demo-cell"},[e._v(" "+e._s(e.itemData.index)+" - "+e._s(e.itemData.id)+" - "+e._s(e.itemData.text)+" ")])},c=[],_=r(l,u,c,!1,null,null,null,null);const f=_.exports,d={name:"DemoSlot",components:{VirtualList:s,Operate:o,Item:f},data(){return{visible:!0,list:a(10)}},async mounted(){},methods:{onTest(){console.log("test")}}};var v=function(){var e=this,t=e._self._c;return t("div",{staticClass:"main"},[t("Operate",{attrs:{virtualListRef:e.$refs.virtualListRef,length:e.list.length,visible:e.visible},on:{"update:visible":function(n){e.visible=n}}}),t("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"demo-slot"},[t("VirtualList",{ref:"virtualListRef",attrs:{test:"test",buffer:2,minSize:40,list:e.list,itemKey:"id",stickyHeaderStyle:"text-align: center; height: 40px; background: #42b983;",headerStyle:"text-align: center; height: 80px; background: cyan",footerStyle:"text-align: center; height: 80px; background: cyan",stickyFooterStyle:"text-align: center; height: 40px; background: #42b983;"},scopedSlots:e._u([{key:"default",fn:function({itemData:n}){return[t("Item",{attrs:{itemData:n}})]}},{key:"stickyHeader",fn:function(){return[t("div",[e._v("\u60AC\u6D6Eheader")])]},proxy:!0},{key:"header",fn:function(){return[t("div",[e._v("header")])]},proxy:!0},{key:"footer",fn:function(){return[t("div",[e._v("footer")])]},proxy:!0},{key:"stickyFooter",fn:function(){return[t("div",[e._v("\u60AC\u6D6Efooter")])]},proxy:!0}])})],1)],1)},m=[],p=r(d,v,m,!1,null,null,null,null);const g=p.exports;export{g as default};
