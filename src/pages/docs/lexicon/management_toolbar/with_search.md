---
parent: Management Toolbar
title: with Search
description: ""
layout: "lexiconMigrationGuide"
weight: 100

clayComponentLink: "https://claycss.com/docs//components/management_toolbar.html"
lexiconPattern: "Management Toolbar"
lexiconPatternLink: "https://lexicondesign.io/docs/patterns/Toolbars/management_bar.html"
---

<article id="before-after">

### How does it look like now (7.0)

<img class="img img-thumbnail" src="/images/lexiconMigration/management_toolbar_search_old.png">

### Changes for Lexicon 2.0 (7.1)

<img class="img img-thumbnail" src="/images/lexiconMigration/management_toolbar_search_new.png">

<img class="img img-thumbnail" src="/images/lexiconMigration/management_toolbar_search_results_new.png">

Change | Reason
--- | ---
① Fills all the bar if only search is present | Lexicon wants the main management toolbar section to be the search form.

</article>

<article id="management-toolbar-with-search">

#### How to apply it?

_ | Action | Mandatory
--- | --- | ---
[1](#step-1) | Locate the code in your application | ✔
[2](#step-2) | Use `clay:management-toolbar` instead of the old `liferay-frontend:management-bar` tag | ✔


### [1] Locate the code in your application <a id="step-1"></a>

Locate the code responsible for rendering the **management-bar** in your application. It should resemble something like the following snippet found in [wiki-web/item/selector/wiki_pages.jsp](https://github.com/liferay/liferay-portal/blob/fe9dfcc0275660a0fe9aafb50ae6b169236f67cf/modules/apps/collaboration/wiki/wiki-web/src/main/resources/META-INF/resources/item/selector/wiki_pages.jsp#L67):

```text/html
<liferay-frontend:management-bar>
	<liferay-frontend:management-bar-filters>
		<li>
			<liferay-item-selector:search />
		</li>
	</liferay-frontend:management-bar-filters>
</liferay-frontend:management-bar>
```

### [2] Use `clay:management-toolbar` instead of the old `liferay-frontend:management-bar` tag <a id="step-2"></a>

Start by adding the following imports to the imports section of your `init.jsp` file:

```text/html
// Import the clay tld file to be able to use the new tag
<%@ taglib uri="http://liferay.com/tld/clay" prefix="clay" %>
```

Don't forget to add the dependencies with to the `frontend-taglib-clay` and `fronteng.taglib.soy` module in your `build.gradle` file:

```text/html
compileOnly project(":apps:foundation:frontend-taglib:frontend-taglib-clay")
compileOnly project(":apps:foundation:frontend-taglib:frontend-taglib-soy")
```

#### Implement the new taglib

Parameter | Description | Default
--- | --- | ---
`clearResultsURL` | Is the URL to reset the search. | _
`disabled` | To disable or not the management toolbar. Usually should be disabled when there're no results | _
`itemsTotal` | Is the total number of items that appears in the dataset to reflect it in the results bar and in the active state. | _
`namespace` | If passed the params `infoPanelId`, `searchFormName`, `searchInputName` and `searchContainerId` will be automatically namespaced. | _
`searchActionURL` | Is the action URL to send the search form. | _
`searchFormName` | The name of the form. | _
`searchFormMethod` | The method of the form, `GET` or `POST`. | `POST`
`searchInputName` | The name of the search input. | `DisplayTerms.KEYWORDS`
`searchValue` | The value of the search input. | `ParamUtil.getString(request, searchInputName)`
`selectable` | To show or not the checkbox to interact with the dataset. Previous `includeCheckBox`. | `true`


```text/html
<clay:management-toolbar
	clearResultsURL="<%= searchURL %>"
	disabled="<%= isDisabled %>"
	itemsTotal="<%= itemsTotal %>"
	namespace="<%= renderResponse.getNamespace() %>"
	searchActionURL="<%= searchURL %>"
	searchFormName="fm"
	searchInputName="<%= DisplayTerms.KEYWORDS %>"
	searchValue="<%= ParamUtil.getString(request, searchInputName) %>"
	selectable="<%= false %>"
/>
```

### [3] Move the definitions into a Display Context <a id="step-3"></a>

<div class="alert alert-info">This step is <em>optional</em> but <strong>recommended</strong></div>

If your application already supports it (or even if it doesn't), consider moving the `Java` portion that generates the navigation items model into a `*DisplayContext` pattern to keep your jsps cleaner and server-free

```text/html
<clay:management-toolbar
	clearResultsURL="<%= myAppDisplayContext.getSearchURL() %>"
    disabled=<%= myAppDisplayContext.isDisabled() %>
	itemsTotal="<%= myAppDisplayContext.getItemsTotal() %>"
	namespace="<%= renderResponse.getNamespace() %>"
	searchActionURL="<%= myAppDisplayContext.getSearchURL() %>"
	searchFormName="<%= myAppDisplayContext.getFormName %>"
	searchInputName="<%= myAppDisplayContext.getSearchInputName %>"
	searchValue="<%= myAppDisplayContext.getSearchValue %>"
	selectable="<%= myAppDisplayContext.isSelectable() %>"
/>
```
</article>