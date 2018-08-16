!function r(o,a,u){function c(e,t){if(!a[e]){if(!o[e]){var i="function"==typeof require&&require;if(!t&&i)return i(e,!0);if(l)return l(e,!0);var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}var n=a[e]={exports:{}};o[e][0].call(n.exports,function(t){return c(o[e][1][t]||t)},n,n.exports,r,o,a,u)}return a[e].exports}for(var l="function"==typeof require&&require,t=0;t<u.length;t++)c(u[t]);return c}({1:[function(t,e,i){!function(){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={props:{gitLog:Array,kirbyOnly:{type:Boolean,default:!0},limit:{default:5,type:Number}},data:function(){return{log:[],paginatedLog:[]}},computed:{paginationOptions:function(){return{limit:this.limit,align:"center",details:!0,keys:this.log.map(function(t){return t.hash}),total:this.log.length,hide:!1}}},mounted:function(){this.initLog(),this.paginate()},methods:{initLog:function(){var e=this;this.log=JSON.parse(JSON.stringify(this.gitLog)),this.log=this.log.map(function(t){var e="By: ",i=t.message.indexOf(e);-1!=i?(t.author=t.message.substring(i+e.length),t.message=t.message.substring(0,i),t.authorSource="Kirby"):t.authorSource="Git";var s=/(.*):\w*(.*)\w*/.exec(t.message);return"Kirby"==t.authorSource&&s&&2<=s.length?(t.commitType=s[1],t.commitSubject=s[2].trim().split("/"),t.commitSubject=t.commitSubject.map(function(t){return t.replace("None",'<span class="k-structure-item-path__none">None</span>')})):(t.commitType="Developer Commit",t.commitSubject=[t.message]),t}).filter(function(t){return"Kirby"==t.authorSource||!e.kirbyOnly})},paginate:function(t){var e=0,i=Math.min(this.log.length,this.limit);t&&(e=t.start-1,i=t.end),this.paginatedLog=this.log.slice(e,i)}}}}(),e.exports.__esModule&&(e.exports=e.exports.default);var s="function"==typeof e.exports?e.exports.options:e.exports;s.render=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("k-field",e._b({},"k-field",e.$attrs,!1),[e.log.length?i("div",[i("ul",{staticClass:"k-structure k-structure--git k-structure--noAction k-structure--firstColumnLarger"},e._l(e.paginatedLog,function(t){return i("li",{key:t.hash,staticClass:"k-structure-item"},[i("div",{staticClass:"k-structure-item-wrapper"},[i("div",{staticClass:"k-structure-item-content"},[i("p",{staticClass:"k-structure-item-text"},[i("span",{staticClass:"k-structure-item-label"},[e._v(e._s(t.commitType))]),e._v(" "),i("span",{staticClass:"k-structure-item-path",attrs:{title:t.commitSubject.join(" / ")}},e._l(t.commitSubject,function(t){return i("span",{domProps:{innerHTML:e._s(t)}})}))]),e._v(" "),i("p",{staticClass:"k-structure-item-text"},[i("span",{staticClass:"k-structure-item-label"},[e._v("Author")]),e._v(" "),i("span",{attrs:{title:t.author}},[e._v(e._s(t.author))])]),e._v(" "),i("p",{staticClass:"k-structure-item-text"},[i("span",{staticClass:"k-structure-item-label"},[e._v("Date")]),e._v(" "),i("span",{attrs:{title:t.dateFormatted}},[e._v(e._s(t.dateFormatted))])])])])])})),e._v(" "),i("k-pagination",e._b({ref:"pagination",on:{paginate:function(t){e.paginate(t)}}},"k-pagination",e.paginationOptions,!1))],1):i("k-box",[e._v("\n    No commits or no repository found.\n  ")])],1)},s.staticRenderFns=[]},{}],2:[function(t,e,i){!function(){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={props:{gitRevisions:Array,fields:{type:Array,default:[]},columns:{type:Array,default:[]},limit:{default:5,type:Number}},data:function(){return{infoColumns:{dateFormatted:"Date"},revisions:[],paginatedRevisions:[]}},created:function(){this.$events.$on("form.change",this.onFormChange),this.$events.$on("form.save",this.onFormSave),this.$events.$on("form.reset",this.onFormReset)},destroyed:function(){this.$events.$off("form.change",this.onFormChange),this.$events.$off("form.save",this.onFormSave),this.$events.$off("form.reset",this.onFormReset)},mounted:function(){this.initInfoColumns(),this.initRevisions(),this.paginate()},computed:{paginationOptions:function(){return{limit:this.limit,align:"center",details:!0,keys:this.revisions.map(function(t){return t.hash}),total:this.revisions.length,hide:!1}}},methods:{onFormChange:function(){},onFormSave:function(){},onFormReset:function(){this.revisions.length&&(this.revisions[0].selected=!0)},initInfoColumns:function(){var t={author:"Author",hash:"Commit-Hash",message:"Commit-Message"},e=!0,i=!1,s=void 0;try{for(var n,r=this.columns[Symbol.iterator]();!(e=(n=r.next()).done);e=!0){var o=n.value;o in t&&(this.infoColumns[o]=t[o])}}catch(t){i=!0,s=t}finally{try{!e&&r.return&&r.return()}finally{if(i)throw s}}},initRevisions:function(){var i=this;console.log(this.gitRevisions),this.revisions=JSON.parse(JSON.stringify(this.gitRevisions)),this.revisions=this.revisions.filter(function(t){var e=Object.keys(t.content).filter(function(t){return-1!==i.fields.indexOf(t)});return 0<(t.updateFields=e).length}),this.revisions=this.revisions.map(function(t){var e=t.message.indexOf("By: ");return-1!=e?(t.author=t.message.substring(e+"By: ".length),t.authorSource="Kirby"):t.authorSource="Git",t}),this.revisions.length&&(this.revisions[0].first=!0,this.revisions[0].selected=!0)},applyRevision:function(t){this.revisions.forEach(function(t){return t.selected=!1}),t.selected=!0,this.$forceUpdate();var e,i,s,n=!0,r=!1,o=void 0;try{for(var a,u=t.updateFields[Symbol.iterator]();!(n=(a=u.next()).done);n=!0){var c=a.value,l=t.content[c];this.$events.$emit("values-push",(s=l,(i=c)in(e={})?Object.defineProperty(e,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[i]=s,e))}}catch(t){r=!0,o=t}finally{try{!n&&u.return&&u.return()}finally{if(r)throw o}}},paginate:function(t){var e=0,i=Math.min(this.revisions.length,this.limit);t&&(e=t.start-1,i=t.end),this.paginatedRevisions=this.revisions.slice(e,i)}}}}(),e.exports.__esModule&&(e.exports=e.exports.default);var s="function"==typeof e.exports?e.exports.options:e.exports;s.render=function(){var s=this,t=s.$createElement,n=s._self._c||t;return s.revisions.length?n("k-field",s._b({},"k-field",s.$attrs,!1),[s.revisions.length?n("div",[n("ul",{staticClass:"k-structure k-structure--git"},s._l(s.paginatedRevisions,function(i){return n("li",{key:i.hash,ref:"structureItem",refInFor:!0,staticClass:"k-structure-item",class:{"k-structure-item--isSelected":i.selected},on:{click:function(t){!i.selected&&s.applyRevision(i)}}},[n("div",{staticClass:"k-structure-item-wrapper"},[n("div",{staticClass:"k-structure-item-content"},s._l(s.infoColumns,function(t,e){return n("p",{staticClass:"k-structure-item-text"},[n("span",{staticClass:"k-structure-item-label"},[s._v("\n                "+s._s(t)+"\n                "),"Date"===t&&i.first?n("span",[s._v("(Latest)")]):s._e()]),s._v(" "),n("span",[s._v(s._s(i[e]))])])}))])])})),s._v(" "),n("k-pagination",s._b({ref:"pagination",on:{paginate:function(t){s.paginate(t)}}},"k-pagination",s.paginationOptions,!1))],1):n("k-box",[s._v("\n    No commits or no repository found.\n  ")])],1):s._e()},s.staticRenderFns=[]},{}],3:[function(t,e,i){"use strict";var s=o(t(4)),n=o(t(1)),r=o(t(2));function o(t){return t&&t.__esModule?t:{default:t}}panel.plugin("wottpal/git",{use:[s.default],fields:{gitLog:n.default,gitRevisions:r.default}})},{1:1,2:2,4:4}],4:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(t){var e=t.options.components["k-fields-section"];e.options.methods.valuesPush||t.component("k-fields-section",{extends:e,created:function(){this.$events.$on("values-push",this.valuesPush)},destroyed:function(){this.$events.$off("values-push",this.valuesPush)},methods:{valuesPush:function(t){var e=!1;for(var i in t)i in this.values&&(this.values[i]=t[i],e=!0);e&&this.input(this.values)}}})}},{}]},{},[3]);
