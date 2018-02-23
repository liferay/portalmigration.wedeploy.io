---
title: Navigation Bar
description: ""
layout: "lexiconMigrationGuide"
weight: 100

clayComponentLink: "https://claycss.com/docs/components/navbar.html"
lexiconPattern: "Navigation Bar"
lexiconPatternLink: "https://lexicondesign.io/docs/patterns/Navigation/horizontalNav.html"
---

<article id="before-after">

### How does it look like now (7.0)

<img class="img img-thumbnail" src="/images/lexiconMigration/navigation_bar_old.png">

### Changes for Lexicon 2.0 (7.1)

<img class="img img-thumbnail" src="/images/lexiconMigration/navigation_bar_new.png">

Change | Reason
--- | ---
① The **Navigation Bar is dark** in admin applications (and light outside of admin contexts) | The Navigation Bar reflects Application Sections and the color helps make this connection
② The **general search is moved out of the Navigation Bar** and into the Management Toolbar | Search applies to the current Application data set and not the application itself

</article>

<article id="steps">

### How to apply it?
_ | Action | Mandatory
--- | --- | ---
[1](#step-1) | Locate the code in your application | ✔
[2](#step-2) | Move the search into the management toolbar | ✔
[3](#step-3) | Use `clay:navigation-bar` instead of the old `aui:navbar` tag | ✔
[4](#step-4) | Extract application sections from the Actions Menu | ✘
[5](#step-5) | Move the navigation items definition into a Display Context | ✘

### [1] Locate the code in your application <a id="step-1"></a>

Locate the code responsible for rendering the **navigation** in your application. It should resemble something like the following snippet found in [blogs-web/blogs-admin/view.jsp](https://github.com/liferay/liferay-portal/blob/master/modules/apps/collaboration/blogs/blogs-web/src/main/resources/META-INF/resources/blogs_admin/view.jsp#L28-L54):

```text/html
<aui:nav-bar cssClass="collapse-basic-search" markupView="lexicon">
	<aui:nav cssClass="navbar-nav">
		<portlet:renderURL var="viewEntriesURL" />

		<aui:nav-item
			href="<%= viewEntriesURL %>"
			label="entries"
			selected='<%= navigation.equals("entries") %>'
		/>
    </aui:nav>

	<aui:form action="<%= portletURL.toString() %>" name="searchFm">
		<aui:nav-bar-search>
			<liferay-ui:input-search markupView="lexicon" />
		</aui:nav-bar-search>
	</aui:form>
</aui:nav-bar>
```

Locate the code responsible for rendering the **management toolbar** in your application. It should resemble something like the following snippet found in [blogs-web/blogs-admin/view_entries.jsp](https://github.com/liferay/liferay-portal/blob/master/modules/apps/collaboration/blogs/blogs-web/src/main/resources/META-INF/resources/blogs_admin/view_entries.jsp#L149-L153):

```text/html
<liferay-frontend:management-bar
	disabled="<%= entriesSearchContainer.getTotal() <= 0 %>"
	includeCheckBox="<%= true %>"
	searchContainerId="blogEntries"
>
    ...
</liferay-frontend:management-bar>
```

### [2] Move the search into the management toolbar <a id="step-2"></a>

Move the part in charge of the search into the `liferay-frontend:management-bar` section, right after the last of the `liferay-frontend-management-bar-filters` item like it's shown in the following snippet. Notice how the usage of `aui:nav-bar-search` from the original snippet is no longer necessary, but an additional `<li>` item needs to be added.

```text/html
<liferay-frontend:management-bar-filters>
    ...

    <li>
        <aui:form action="<%= portletURL.toString() %>" name="searchFm">
            <liferay-ui:input-search markupView="lexicon" />
        </aui:form>
    </li>
</liferay-frontend:management-bar-filters>
```

### [3] Use `clay:navigation-bar` instead of the old `aui:navbar` tag <a id="step-3"></a>

Start by adding the following imports to the imports section of your `init.jsp` file:

```text/html
// Import the clay tld file to be able to use the new tag
<%@ taglib uri="http://liferay.com/tld/clay" prefix="clay" %>

// Import the NavigationItem utility class to create the items model
<%@ page import="com.liferay.frontend.taglib.clay.servlet.taglib.util.NavigationItem" %>
<%@ page import="com.liferay.frontend.taglib.clay.servlet.taglib.util.JSPNavigationItemList" %>
```

Don't forget to add the dependencies with to the `frontend-taglib-clay` and `fronteng.taglib.soy` module in your `build.gradle` file:

```text/html
provided group: "com.liferay", name: "com.liferay.frontend.taglib.soy", version: "1.0.0"

provided project(":apps:foundation:frontend-taglib:frontend-taglib-clay")
```

Model your entries using the `NavigationItem` class and pass it down to the tag instance.

<div class="alert alert-warning">The `inverted` attribute is set to true in all admin portlets. Instances in applications for live  sites only can be left to false (default)</div>

```text/html
<clay:navigation-bar
	inverted="<%= true %>"
	items="<%=
		new JSPNavigationItemList(pageContext) {
			{
				List<String> configurationCategories = (List<String>)request.getAttribute(ConfigurationAdminWebKeys.CONFIGURATION_CATEGORIES);

				if (configurationCategories != null) {
					for (String curConfigurationCategory : configurationCategories) {
						add(
							navigationItem -> {
								navigationItem.setActive(curConfigurationCategory.equals(configurationCategory));
								navigationItem.setHref(renderResponse.createRenderURL(), "configurationCategory", "curConfigurationCategory");
								navigationItem.setLabel(LanguageUtil.get(request, curConfigurationCategory));
							}
						);
					}
				}
			}
		}
	%>"
/>
```

Check out the following [Sample usage of JSPNavigationItemList](https://github.com/liferay/liferay-portal/commit/1ab9c006c750052f5c1c7df7072aab961b89966c) for more information about it.

### [4] Extract application sections from the Actions Menu <a id="step-4"></a>

<div class="alert alert-info">This step is <em>optional</em> but <strong>recommended</strong></div>

All Application Sections should be clearly visible in the Navigation Bar. Consider exploring what options your application currently has in the Actions Menu (find instances of `*PortletConfigurationIcon`) to find section candidates.

<img class="img img-thumbnail" src="/images/lexiconMigration/navigation_bar_application_sections.png">

### [5] Move the navigation items definition into a Display Context <a id="step-5"></a>

<div class="alert alert-info">This step is <em>optional</em> but <strong>recommended</strong></div>

If your application already supports it (or even if it doesn't), consider moving the `Java` portion that generates the navigation items model into a `*DisplayContext` pattern to keep your jsps cleaner and server-free

```text/html
<clay:navigation-bar
	inverted="<%= true %>"
	items="<%= myAppAdminViewDisplayContext.getNavigationItems() %>" />
```

Check out the following [Sample usage of NavigationItemList](https://github.com/liferay/liferay-portal/commit/14b3bab9d42c19a24a84eac71c0d3658e3f9fc10) for more information about it.

</article>

<article id="who-has-it-ready">

### Who has done it already?

LPS | Pull Request | Master
--- | --- | ---
[LPS-77166](https://issues.liferay.com/browse/LPS-77166) | [https://github.com/brianchandotcom/liferay-portal/pull/54459](https://github.com/brianchandotcom/liferay-portal/pull/54459) | ✘

</article>
