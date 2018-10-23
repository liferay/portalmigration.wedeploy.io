---
parent: Management Toolbar
title: with Creation Menu
description: ""
layout: "lexiconMigrationGuide"
weight: 100

clayComponentLink: "https://clayui.com/docs/components/toolbars/management-toolbar.html"
lexiconPattern: "Management Toolbar"
lexiconPatternLink: "https://lexicondesign.io/docs/patterns/Toolbars/management_bar.html"
---

<article id="before-after">

### How does it look like now (7.0)

<img class="img img-thumbnail" src="/images/lexiconMigration/management_toolbar_creation_menu_old.png">

### Changes for Lexicon 2.0 (7.1)

<img class="img img-thumbnail" src="/images/lexiconMigration/management_toolbar_creation_menu_new.png">

Change | Reason
--- | ---
① Add Menu is now part of the Management Toolbar | See [Add Menu](../add_menu.html).

</article>

<article id="management-toolbar-with-creation-menu">

#### How to apply it?

_ | Action | Mandatory
--- | --- | ---
[1](#step-1) | Locate the code in your application | ✔
[2](#step-2) | Use `clay:management-toolbar` instead of the old `liferay-frontend:management-bar` tag | ✔
[3](#step-3) | Move the creation menu definition into a Display Context | ✘

### [1] Locate the code in your application <a id="step-1"></a>

Locate the code responsible for rendering the **management-bar** in your application. It should resemble something like the following snippet found in [asset-tags-admin-web/view.jsp](https://github.com/liferay/liferay-portal/blob/fe9dfcc0275660a0fe9aafb50ae6b169236f67cf/modules/apps/web-experience/asset/asset-tags-admin-web/src/main/resources/META-INF/resources/view.jsp#L28):

```text/html
<liferay-frontend:management-bar
	disabled="<%= assetTagsDisplayContext.isDisabledTagsManagementBar() %>"
	includeCheckBox="<%= true %>"
	searchContainerId="assetTags"
>
	...

	<liferay-frontend:management-bar-buttons>
		...

		<c:if test="<%= assetTagsDisplayContext.isShowAddButton() %>">
			<portlet:renderURL var="editTagURL">
				<portlet:param name="mvcPath" value="/edit_tag.jsp" />
			</portlet:renderURL>

			<liferay-frontend:add-menu
				inline="<%= true %>"
			>
				<liferay-frontend:add-menu-item
					title='<%= LanguageUtil.get(request, "add-tag") %>'
					url="<%= editTagURL.toString() %>"
				/>
			</liferay-frontend:add-menu>
		</c:if>
	</liferay-frontend:management-bar-buttons>
...

</liferay-frontend:management-bar>
```

### [2] Use `clay:management-toolbar` instead of the old `liferay-frontend:management-bar` tag <a id="step-2"></a>

Start by adding the following imports to the imports section of your `init.jsp` file:

```text/html
// Import the clay tld file to be able to use the new tag
<%@ taglib uri="http://liferay.com/tld/clay" prefix="clay" %>

// Import the CreationMenu utility class to create the creation menu model
<%@ page import="com.liferay.frontend.taglib.clay.servlet.taglib.util.JSPCreationMenu" %>
```

Don't forget to add the dependencies with to the `frontend-taglib-clay` and `fronteng.taglib.soy` module in your `build.gradle` file:

```text/html
compileOnly project(":apps:foundation:frontend-taglib:frontend-taglib-clay")
compileOnly project(":apps:foundation:frontend-taglib:frontend-taglib-soy")
```

#### Implement the new taglib

Parameter | Description | Default
--- | --- | ---
`creationMenu` | Is the list of dropdownItems to show in the creation menu. If only one item is present add button will be a link instead a dropdown. | _
`disabled` | To disable or not the management toolbar. Usually should be disabled when there're no results | _
`itemsTotal` | Is the total number of items that appears in the dataset to reflect it in the results bar and in the active state. | _
`namespace` | If passed the params `infoPanelId`, `searchFormName`, `searchInputName` and `searchContainerId` will be automatically namespaced. | _
`selectable` | To show or not the checkbox to interact with the dataset. Previous `includeCheckBox`. | `true`
`showCreationMenu` | To show or not the add content button. | If `creationMenu` != null `true` else `false`.

```text/html
<clay:management-toolbar
	creationMenu="<%= 
		new JSPCreationMenu(pageContext) {
			{
				addPrimaryDropdownItem(
					dropdownItem -> {
						dropdownItem.setHref(
							_renderResponse.createRenderURL(), "mvcPath",
							"/edit_tag.jsp");
						dropdownItem.setLabel("add-tag");
					});
			}
		}
	%>"
	disabled="<%= assetTagsDisplayContext.isDisabledTagsManagementBar() %>"
	itemsTotal="<%= assetTagsDisplayContext.getItemsTotal() %>"
	namespace="<%= renderResponse.getNamespace() %>"
	selectable="<%= false %>"
	showCreationMenu="<%= assetTagsDisplayContext.isShowAddButton() %>"
/>
```

### [3] Move the definitions into a Display Context <a id="step-3"></a>

<div class="alert alert-info">This step is <em>optional</em> but <strong>recommended</strong></div>

If your application already supports it (or even if it doesn't), consider moving the `Java` portion that generates the navigation items model into a `*DisplayContext` pattern to keep your jsps cleaner and server-free

```text/html
<clay:management-toolbar
	creationMenu="<%= assetTagsDisplayContext.getCreationMenu() %>"
	disabled="<%= assetTagsDisplayContext.isDisabledTagsManagementBar() %>
	itemsTotal="<%= assetTagsDisplayContext.getItemsTotal() %>"
	namespace="<%= renderResponse.getNamespace() %>"
	selectable="<%= true %>"
	showCreationMenu="<%= assetTagsDisplayContext.isShowAddButton() %>"
/>
```
</article>