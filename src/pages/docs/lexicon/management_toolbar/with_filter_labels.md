---
parent: Management Toolbar
title: with Filter Labels
description: ""
layout: "lexiconMigrationGuide"
weight: 100

clayComponentLink: "https://claycss.com/docs//components/management_toolbar.html"
lexiconPattern: "Management Toolbar"
lexiconPatternLink: "https://lexicondesign.io/docs/patterns/Toolbars/management_bar.html"
---

<article id="before-after">

### How does it look like now (7.1)

<img class="img img-thumbnail" src="/images/lexiconMigration/management_toolbar_filter_label_items_old.jpg">

### Changes for Lexicon 2.0 (7.2)

<img class="img img-thumbnail" src="/images/lexiconMigration/management_toolbar_filter_label_items_new.jpg">

Change | Reason
--- | ---
① Filters are visible in a new bar under the management toolbar | Lexicon wants that info to be directly visible.

</article>

<article id="management-toolbar-with-creation-menu">

#### How to apply it?

_ | Action | Mandatory
--- | --- | ---
[1](#step-1) | Locate the code in your application | ✔
[2](#step-2) | Add parameter `filterLabelItems` to `clay:management-toolbar` tag | ✔
[3](#step-3) | Move the definitions into a Display Context | ✘

### [1] Locate the code in your application <a id="step-1"></a>

Locate the code responsible for rendering the **management-toolbar** in your application. It should resemble something like the following snippet found in [frontend-taglib-clay-sample/management-toolbars.jsp](https://github.com/liferay/liferay-portal/blob/fe9dfcc0275660a0fe9aafb50ae6b169236f67cf/modules/apps/web-experience/asset/asset-tags-admin-web/src/main/resources/META-INF/resources/view.jsp#L28):

```text/html
<clay:management-toolbar
	creationMenu="<%= managementToolbarsDisplayContext.getCreationMenu() %>"
	filterDropdownItems="<%= managementToolbarsDisplayContext.getFilterDropdownItems() %>"
	searchActionURL="mySearchActionURL?key1=val1&key2=val2&key3=val3"
	searchFormName="mySearchName"
	searchInputName="mySearchInputName"
	selectable="<%= true %>"
	sortingOrder="desc"
	viewTypeItems="<%= managementToolbarsDisplayContext.getViewTypeItems() %>"
/>
```

### [2] Add parameter `filterLabelItems`

Start by adding the following imports to the imports section of your `init.jsp` file:

```text/html
// Import the DropdownItemList utility class to create the filter items model
<%@ page import="com.liferay.frontend.taglib.clay.servlet.taglib.util.LabelItemList" %>
```

#### Implement the new parameter

Property | Description | Default
--- | --- | ---
`closeable` | To make the label closeable or not. | `false`
`label` | Text of the label. | _
`style` | The style of the label. Options are `danger`, `info`, `secondary`, `warning`, `success`. | `secondary`

```text/html
<clay:management-toolbar
    disabled=<%= assetTagsDisplayContext.isDisabledTagsManagementBar() %>
	filterItems="<%= assetTagsDisplayContext.getFilterItems() %>
	filterLabelItems="<%=
		new LabelItemList() {
			{
				add(
					labelItem -> {
						labelItem.setLabel("Filter 1");
					});

				add(
					labelItem -> {
						labelItem.setLabel("Filter 2");
					});
			}
		};
    %>"
	namespace="<%= renderResponse.getNamespace() %>"
    selectable="<%= true %>"
	sortingOrder="<%= ParamUtil.getString(request, "orderByType", "asc") %>"
	sortingURL="<%= assetTagsDisplayContext.getSortingURL() %>"
	totalItems="<%= assetTagsDisplayContext.getTotalItems() %>"
/>
```

### [3] Move the definitions into a Display Context <a id="step-3"></a>

<div class="alert alert-info">This step is <em>optional</em> but <strong>recommended</strong></div>

If your application already supports it (or even if it doesn't), consider moving the `Java` portion that generates the navigation items model into a `*DisplayContext` pattern to keep your jsps cleaner and server-free

```text/html
<clay:management-toolbar
    disabled=<%= assetTagsDisplayContext.isDisabledTagsManagementBar() %>
	filterItems="<%= assetTagsDisplayContext.getFilterItems() %>"
	filterLabelItems="<%= assetTagsDisplayContext.getFilterLabelItems() %>"
	namespace="<%= renderResponse.getNamespace() %>"
    selectable="<%= true %>"
	sortingOrder="<%= assetTagsDisplayContext.getSortingOrder() %>"
	sortingURL="<%= assetTagsDisplayContext.getSortingURL() %>"
	totalItems="<%= assetTagsDisplayContext.getTotalItems() %>"
/>
```
</article>