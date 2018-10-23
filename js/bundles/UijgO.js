var pageComponent=webpackJsonppageComponent([17],{203:function(e,t,o){"use strict";function d(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=o(0),a=d(l),i=o(1),u=d(i);o(3),o(4),o(5),o(6),o(7),o(8),o(9),o(10),o(11);var s=o(204),p=d(s),m=function(e){function t(){return r(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,e),t}(a.default);u.default.register(m,p.default),t.default=m},204:function(e,t,o){"use strict";function d(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.templates=t.UijgO=void 0;var l,a=o(0),i=d(a),u=o(1),s=d(u);goog.loadModule(function(e){function t(e,t,d){var l=function(){r("p"),c("AUI.$ returns a jQuery nodeList with many methods available. Replacing it with "),r("code"),c("document.querySelector"),n("code"),c(" or "),r("code"),c("document.querySelectorAll"),n("code"),c(" we lose all that methods."),n("p"),r("article",null,null,"id","how-to-migrate"),r("h3"),c("How to migrate:"),n("h3"),r("ul"),r("li"),r("p"),c("Replace "),r("code"),c("AUI.$(selector)"),n("code"),c(" with "),r("code"),c("document.querySelector(selector)"),n("code"),c(" if expected result is one node."),n("p"),n("li"),r("li"),r("p"),c("Replace "),r("code"),c("AUI.$(selector)"),n("code"),c(" with "),r("code"),c("document.querySelectorAll(selector)"),n("code"),c(" if expected result is more than one node. In this case you will have to iterate over the array to execute methods on each node if needed."),n("p"),n("li"),n("ul"),r("h4"),c("Migrate methods:"),n("h4"),r("div",null,null,"class","alert alert-info"),c("Some methods can't be directly replaced with native implementations so we may need to use some utilities from metal like `metal-dom`. To do it we need to import the module in the jsp in the following way."),n("div"),a({code:'<aui:script require="metal-dom/src/dom">\n  let dom = metalDomSrcDom.default;\n  ...\n</aui:script>',mode:"text/dom"},null,d),a({code:'<aui:script require="metal-dom/src/domData">\n  let domData = metalDomSrcDomData.default;\n  ...\n</aui:script>',mode:"text/domData"},null,d),r("h4"),c("Direct replacements"),n("h4"),r("table"),r("thead"),r("tr"),r("th"),c("jQuery"),n("th"),r("th"),c("replacement"),n("th"),n("tr"),n("thead"),r("tbody"),r("tr"),r("td"),r("code"),c(".addClass()"),n("code"),n("td"),r("td"),r("code"),c("dom.addClasses(element, classes)"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".append()"),n("code"),n("td"),r("td"),r("code"),c("dom.append(parent, child)"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".attr(attribute)"),n("code"),n("td"),r("td"),r("code"),c(".getAttribute(attribute)"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".attr(attribute, value)"),n("code"),n("td"),r("td"),r("code"),c(".setAttribute(attribute, value)"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".closest()"),n("code"),n("td"),r("td"),c("TODO"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".collapse()"),n("code"),n("td"),r("td"),c("TODO"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".data()"),n("code"),n("td"),r("td"),r("code"),c("domData.get(element, 'propertyName')"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".data(value)"),n("code"),n("td"),r("td"),r("code"),c("domData.set(element, 'propertyName', value)"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".each()"),n("code"),n("td"),r("td"),r("code"),c(".forEach"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".find()"),n("code"),n("td"),r("td"),r("code"),c(".querySelector()"),n("code"),c(" or "),r("code"),c("querySelectorAll()"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".formToArray()"),n("code"),n("td"),r("td"),c("TODO"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".html()");n("code"),n("td"),r("td"),r("code"),c(".innerHTML"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".html(value)"),n("code"),n("td"),r("td"),r("code"),c(".innerHTML = value"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".map()"),n("code"),n("td"),r("td"),r("code"),c("[...document.querySelectorAll(selector)].map()"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".on()"),n("code"),n("td"),r("td"),r("code"),c("addEventListener()"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".one()"),n("code"),n("td"),r("td"),r("code"),c("dom.once(element, eventName, fn)"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".prepend()"),n("code"),n("td"),r("td"),c("TODO"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".prop('property')"),n("code"),n("td"),r("td"),r("code"),c("element.property"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".prop('property', value)"),n("code"),n("td"),r("td"),r("code"),c("element.property = value"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".ready(fn)"),n("code"),n("td"),r("td"),r("code"),c("document.addEventListener('DOMContentLoaded', fn, false)"),n("code"),c(" "),r("br"),n("br"),c(" "),r("code"),c("window.addEventListener('load', fn,false)"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".remove()"),n("code"),n("td"),r("td"),r("code"),c("dom.exitDocument(element)"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c("toggleClass('class')"),n("code"),n("td"),r("td"),r("code"),c("dom.toggleClasses(element, 'class')"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".tooltip()"),n("code"),n("td"),r("td"),c("TODO"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".val()"),n("code"),n("td"),r("td"),r("code"),c(".value"),n("code"),n("td"),n("tr"),r("tr"),r("td"),r("code"),c(".val(newValue)"),n("code"),n("td"),r("td"),r("code"),c(".value = newValue"),n("code"),n("td"),n("tr"),n("tbody"),n("table"),r("h4"),c("Code replacements"),n("h4"),r("ul"),r("li"),r("p"),c("Replace "),r("code"),c(".ajaxSubmit()"),n("code"),c(" with:"),n("p"),a({code:"fetch(url, {\n  body: new FormData(form),\n  credentials: 'include',\n  method: 'POST',\n  ...\n})\n.then(response => ...);",mode:"javascript"},null,d),n("li"),r("li"),r("p"),c("Replace "),r("code"),c(".load()"),n("code"),c(" with:"),n("p"),a({code:"fetch(url, data)\n.then(response => {\n  element.innerHTML = response;\n});",mode:"javascript"},null,d),n("li"),r("li"),r("p"),c("Replace "),r("code"),c(".serializeArray()"),n("code"),c(" with:");n("p"),a({code:"  form\n  dom.exitDocument(element)",mode:"javascript"},null,d),n("li"),r("li"),r("p"),c("Replace "),r("code"),c(".sideNavigation()"),n("code"),c(" TODO."),n("p"),n("li"),r("li"),r("p"),c("Replace "),r("code"),c(".toggle()"),n("code"),c(" with:"),n("p"),a({code:"if (element.style.display === 'none')\n  element.style.display = 'block';\nelse\n  element.style.display = 'none';",mode:"javascript"},null,d),n("li"),n("ul"),n("article"),r("input",null,null,"type","hidden","value",e.page.title),n("input"),r("input",null,null,"type","hidden","value",e.site.title),n("input")};i(o.$$assignDefaults({content:l},e),null,d)}goog.module("UijgO.incrementaldom");var o=goog.require("soy");goog.require("soydata");goog.require("goog.asserts"),goog.require("soy.asserts"),goog.require("goog.i18n.bidi"),goog.require("goog.string");var d=goog.require("incrementaldom"),r=d.elementOpen,n=d.elementClose,c=(d.elementVoid,d.elementOpenStart,d.elementOpenEnd,d.text),a=(d.attr,s.default.getTemplate("ElectricCode.incrementaldom","render")),i=s.default.getTemplate("guide.incrementaldom","render");return e.render=t,goog.DEBUG&&(t.soyTemplateName="UijgO.render"),e.render.params=["page","site"],e.render.types={page:"?",site:"?"},e.templates=l=e,e});var p=function(e){function t(){return r(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,e),t}(i.default);s.default.register(p,l),t.UijgO=p,t.templates=l,t.default=l}},[203]);