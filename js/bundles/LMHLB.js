var pageComponent=webpackJsonppageComponent([2],{215:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n(0),s=o(l),d=n(1),c=o(d);n(3),n(4),n(5),n(6),n(7),n(8),n(9),n(10),n(11);var u=n(216),p=o(u),g=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),t}(s.default);c.default.register(g,p.default),t.default=g},216:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.templates=t.LMHLB=void 0;var l,s=n(0),d=o(s),c=n(1),u=o(c);goog.loadModule(function(e){function t(e,t,o){var l=function(){a("article",null,null,"id","before-after"),a("h3"),s("How does it look like now (7.0)"),i("h3"),a("p"),a("img",null,null,"class","img img-thumbnail","src","/images/lexiconMigration/navigation_bar_old.png"),i("img"),i("p"),a("h3"),s("Changes for Lexicon 2.0 (7.1)"),i("h3"),a("p"),a("img",null,null,"class","img img-thumbnail","src","/images/lexiconMigration/navigation_bar_new.png"),i("img"),i("p"),a("table"),a("thead"),a("tr"),a("th"),s("Change"),i("th"),a("th"),s("Reason"),i("th"),i("tr"),i("thead"),a("tbody"),a("tr"),a("td"),s("① The "),a("strong"),s("Navigation Bar is dark"),i("strong"),s(" in admin applications (and light outside of admin contexts)"),i("td"),a("td"),s("The Navigation Bar reflects Application Sections and the color helps make this connection"),i("td"),i("tr"),a("tr"),a("td"),s("② The "),a("strong"),s("general search is moved out of the Navigation Bar"),i("strong"),s(" and into the Management Toolbar"),i("td"),a("td"),s("Search applies to the current Application data set and not the application itself"),i("td"),i("tr"),i("tbody"),i("table"),i("article"),a("article",null,null,"id","steps"),a("h3"),s("How to apply it?"),i("h3"),a("table"),a("thead"),a("tr"),a("th"),s("_"),i("th"),a("th"),s("Action"),i("th"),a("th"),s("Mandatory"),i("th"),i("tr"),i("thead"),a("tbody"),a("tr"),a("td"),a("a",null,null,"href","#step-1"),s("1"),i("a"),i("td"),a("td"),s("Locate the code in your application"),i("td"),a("td"),s("✔"),i("td"),i("tr"),a("tr"),a("td"),a("a",null,null,"href","#step-2"),s("2"),i("a"),i("td"),a("td"),s("Move the search into the management toolbar"),i("td"),a("td"),s("✔"),i("td"),i("tr"),a("tr"),a("td"),a("a",null,null,"href","#step-3"),s("3"),i("a"),i("td"),a("td"),s("Use "),a("code"),s("clay:navigation-bar"),i("code"),s(" instead of the old "),a("code"),s("aui:navbar"),i("code"),s(" tag"),i("td"),a("td"),s("✔"),i("td"),i("tr"),a("tr"),a("td"),a("a",null,null,"href","#step-4"),s("4"),i("a"),i("td"),a("td"),s("Extract application sections from the Actions Menu"),i("td"),a("td"),s("✘"),i("td"),i("tr"),a("tr"),a("td"),a("a",null,null,"href","#step-5"),s("5"),i("a"),i("td"),a("td"),s("Move the navigation items definition into a Display Context"),i("td"),a("td"),s("✘"),i("td"),i("tr"),i("tbody"),i("table"),a("h3"),s("[1] Locate the code in your application "),r("a",null,null,"id","step-1"),i("h3"),a("p"),s("Locate the code responsible for rendering the "),a("strong"),s("navigation"),i("strong"),s(" in your application. It should resemble something like the following snippet found in "),a("a",null,null,"href","https://github.com/liferay/liferay-portal/blob/master/modules/apps/collaboration/blogs/blogs-web/src/main/resources/META-INF/resources/blogs_admin/view.jsp#L28-L54"),s("blogs-web/blogs-admin/view.jsp"),i("a"),s(":"),i("p"),d({code:'<aui:nav-bar cssClass="collapse-basic-search" markupView="lexicon">\n    <aui:nav cssClass="navbar-nav">\n        <portlet:renderURL var="viewEntriesURL" />\n\n        <aui:nav-item\n            href="<%= viewEntriesURL %>"\n            label="entries"\n            selected=\'<%= navigation.equals("entries") %>\'\n        />\n    </aui:nav>\n\n    <aui:form action="<%= portletURL.toString() %>" name="searchFm">\n        <aui:nav-bar-search>\n            <liferay-ui:input-search markupView="lexicon" />\n        </aui:nav-bar-search>\n    </aui:form>\n</aui:nav-bar>',mode:"text/html"},null,o),a("p"),s("Locate the code responsible for rendering the "),a("strong"),s("management toolbar"),i("strong"),s(" in your application. It should resemble something like the following snippet found in "),a("a",null,null,"href","https://github.com/liferay/liferay-portal/blob/master/modules/apps/collaboration/blogs/blogs-web/src/main/resources/META-INF/resources/blogs_admin/view_entries.jsp#L149-L153"),s("blogs-web/blogs-admin/view_entries.jsp"),i("a"),s(":"),i("p"),d({code:'<liferay-frontend:management-bar\n    disabled="<%= entriesSearchContainer.getTotal() <= 0 %>"\n    includeCheckBox="<%= true %>"\n    searchContainerId="blogEntries"\n>\n    ...\n</liferay-frontend:management-bar>',mode:"text/html"},null,o),a("h3"),s("[2] Move the search into the management toolbar "),r("a",null,null,"id","step-2"),i("h3"),a("p"),s("Move the part in charge of the search into the "),a("code"),s("liferay-frontend:management-bar"),i("code"),s(" section, right after the last of the "),a("code"),s("liferay-frontend-management-bar-filters"),i("code"),s(" item like it's shown in the following snippet. Notice how the usage of "),a("code"),s("aui:nav-bar-search"),i("code"),s(" from the original snippet is no longer necessary, but an additional "),a("code"),s("<li>"),i("code"),s(" item needs to be added."),i("p"),d({code:'<liferay-frontend:management-bar-filters>\n    ...\n\n    <li>\n        <aui:form action="<%= portletURL.toString() %>" name="searchFm">\n            <liferay-ui:input-search markupView="lexicon" />\n        </aui:form>\n    </li>\n</liferay-frontend:management-bar-filters>',mode:"text/html"},null,o);a("h3"),s("[3] Use "),a("code"),s("clay:navigation-bar"),i("code"),s(" instead of the old "),a("code"),s("aui:navbar"),i("code"),s(" tag "),r("a",null,null,"id","step-3"),i("h3"),a("p"),s("Start by adding the following imports to the imports section of your "),a("code"),s("init.jsp"),i("code"),s(" file:"),i("p"),d({code:'// Import the clay tld file to be able to use the new tag\n<%@ taglib uri="http://liferay.com/tld/clay" prefix="clay" %>\n\n// Import the NavigationItem utility class to create the items model\n<%@ page import="com.liferay.frontend.taglib.clay.servlet.taglib.util.JSPNavigationItemList" %>',mode:"text/html"},null,o),a("p"),s("Don't forget to add the dependencies with to the "),a("code"),s("frontend-taglib-clay"),i("code"),s(" and "),a("code"),s("fronteng.taglib.soy"),i("code"),s(" module in your "),a("code"),s("build.gradle"),i("code"),s(" file:"),i("p"),d({code:'provided group: "com.liferay", name: "com.liferay.frontend.taglib.soy", version: "1.0.0"\n\nprovided project(":apps:foundation:frontend-taglib:frontend-taglib-clay")',mode:"text/html"},null,o),a("p"),s("Model your entries using the "),a("code"),s("JSPNavigationItemList"),i("code"),s(" class."),i("p"),a("div",null,null,"class","alert alert-warning"),s("The `inverted` attribute is set to true in all admin portlets. Instances in applications for live  sites only can be left to false (default)"),i("div"),d({code:'<clay:navigation-bar\n    inverted="<%= true %>"\n    navigationItems="<%=\n        new JSPNavigationItemList(pageContext) {\n            {\n                List<String> configurationCategories = (List<String>)request.getAttribute(ConfigurationAdminWebKeys.CONFIGURATION_CATEGORIES);\n\n                if (configurationCategories != null) {\n                    for (String curConfigurationCategory : configurationCategories) {\n                        add(\n                            navigationItem -> {\n                                navigationItem.setActive(curConfigurationCategory.equals(configurationCategory));\n                                navigationItem.setHref(renderResponse.createRenderURL(), "configurationCategory", "curConfigurationCategory");\n                                navigationItem.setLabel(LanguageUtil.get(request, curConfigurationCategory));\n                            }\n                        );\n                    }\n                }\n            }\n        }\n    %>"\n/>',mode:"text/html"},null,o),a("p"),s("Check out the following "),a("a",null,null,"href","https://github.com/liferay/liferay-portal/commit/1ab9c006c750052f5c1c7df7072aab961b89966c"),s("Sample usage of JSPNavigationItemList"),i("a"),s(" for more information about it."),i("p"),a("h3"),s("[4] Extract application sections from the Actions Menu "),r("a",null,null,"id","step-4"),i("h3"),a("div",null,null,"class","alert alert-info"),s("This step is "),a("em"),s("optional"),i("em"),s(" but "),a("strong"),s("recommended"),i("strong"),i("div"),a("p"),s("All Application Sections should be clearly visible in the Navigation Bar. Consider exploring what options your application currently has in the Actions Menu (find instances of "),a("code"),s("*PortletConfigurationIcon"),i("code"),s(") to find section candidates."),i("p"),a("p"),a("img",null,null,"class","img img-thumbnail","src","/images/lexiconMigration/navigation_bar_application_sections.png"),i("img"),i("p"),a("h3"),s("[5] Move the navigation items definition into a Display Context "),r("a",null,null,"id","step-5"),i("h3"),a("div",null,null,"class","alert alert-info"),s("This step is "),a("em"),s("optional"),i("em"),s(" but "),a("strong"),s("recommended"),i("strong"),i("div"),a("p"),s("If your application already supports it (or even if it doesn't), consider moving the "),a("code"),s("Java"),i("code"),s(" portion that generates the navigation items model into a "),a("code"),s("*DisplayContext"),i("code"),s(" pattern to keep your jsps cleaner and server-free"),i("p"),d({code:'<clay:navigation-bar\n    inverted="<%= true %>"\n    navigationItems="<%= myAppAdminViewDisplayContext.getNavigationItems() %>" />',mode:"text/html"},null,o),a("p"),s("Check out the following "),a("a",null,null,"href","https://github.com/liferay/liferay-portal/commit/14b3bab9d42c19a24a84eac71c0d3658e3f9fc10"),s("Sample usage of NavigationItemList"),i("a"),s(" for more information about it."),i("p"),i("article"),a("article",null,null,"id","who-has-it-ready"),a("h3"),s("Who has done it already?"),i("h3"),a("table"),a("thead"),a("tr"),a("th"),s("LPS"),i("th"),a("th"),s("Pull Request"),i("th"),a("th"),s("Master"),i("th"),i("tr"),i("thead"),a("tbody"),a("tr"),a("td"),a("a",null,null,"href","https://issues.liferay.com/browse/LPS-77166"),s("LPS-77166"),i("a"),i("td"),a("td"),a("a",null,null,"href","https://github.com/brianchandotcom/liferay-portal/pull/54459"),s("https://github.com/brianchandotcom/liferay-portal/pull/54459"),i("a"),i("td"),a("td"),s("✘"),i("td"),i("tr"),i("tbody"),i("table"),i("article"),a("input",null,null,"type","hidden","value",e.page.title),i("input"),a("input",null,null,"type","hidden","value",e.site.title),i("input")};c(n.$$assignDefaults({content:l},e),null,o)}goog.module("LMHLB.incrementaldom");var n=goog.require("soy");goog.require("soydata");goog.require("goog.asserts"),goog.require("soy.asserts"),goog.require("goog.i18n.bidi"),goog.require("goog.string");var o=goog.require("incrementaldom"),a=o.elementOpen,i=o.elementClose,r=o.elementVoid,s=(o.elementOpenStart,o.elementOpenEnd,o.text),d=(o.attr,u.default.getTemplate("ElectricCode.incrementaldom","render")),c=u.default.getTemplate("lexiconMigrationGuide.incrementaldom","render");return e.render=t,goog.DEBUG&&(t.soyTemplateName="LMHLB.render"),e.render.params=["page","site"],e.render.types={page:"?",site:"?"},e.templates=l=e,e});var p=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),t}(d.default);u.default.register(p,l),t.LMHLB=p,t.templates=l,t.default=l}},[215]);