(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2176fb"],{c75f:function(t,e,i){"use strict";i.r(e),i.d(e,"obd_table_employees",(function(){return o}));var n=i("2205"),o=function(){function t(t){Object(n["f"])(this,t),this.employees="[]",this.columns=[{key:"name",text:"Meno"},{key:"email",text:"Email"},{key:"type-of-employment",text:"Druh pracovného pomeru"}],this.tableActions=[{text:"",action:"edit",icon:"fas fa-edit",color:"#2d4059"},{text:"",action:"delete",icon:"fas fa-trash-alt",color:"#ea5455"}],this.edit=Object(n["d"])(this,"edit",7),this.delete=Object(n["d"])(this,"delete",7)}return t.prototype.action=function(t){var e=t.detail.action,i=t.detail.id;switch(e){case"edit":this.edit.emit(i);break;case"delete":this.delete.emit(i);break}},t.prototype.render=function(){var t=this;return Object(n["e"])("obd-table",{data:this.employees,columns:JSON.stringify(this.columns),actions:JSON.stringify(this.tableActions),onAction:function(e){return t.action(e)}})},Object.defineProperty(t,"style",{get:function(){return":host{display:block}"},enumerable:!0,configurable:!0}),t}()}}]);
//# sourceMappingURL=chunk-2d2176fb.55b2c8d3.js.map