---
title: Management Toolbar
description: ""
layout: "lexiconMigrationGuide"
weight: 100

clayComponentLink: "https://claycss.com/docs//components/management_toolbar.html"
lexiconPattern: "Management Toolbar"
lexiconPatternLink: "https://lexicondesign.io/docs/patterns/Toolbars/management_bar.html"
---

<article id="before-after">

### How does it look like now (7.0)

<img class="img img-thumbnail" src="/images/lexiconMigration/management_toolbar_old.png">

### Changes for Lexicon 2.0 (7.1)

<img class="img img-thumbnail" src="/images/lexiconMigration/management_toolbar_new.png">

Change | Reason
--- | ---
① Filters and sorting are group in one dropdown | Lexicon wants the main management toolbar section to be the search form.
② Sorting buttons are now a single toggle button | Reduce the used space in the toolbar.
③ Search field is now part of the Management Toolbar | See [Navigation Bar](../navigation_bar.html).
④ View types are now grouped in a singled dropdown | Reduce the used space in the toolbar.
⑤ Add Menu is now part of the Management Toolbar | See [Add Menu](../add_menu.html).

</article>

<article id="steps">

### How to apply it?

_ | Action | Mandatory
--- | --- | ---
[1](#step-1) | Locate the code in your application | ✔
[2](#step-2) | Use `clay:management-toolbar` instead of the old `liferay-frontend:management-bar` tag | ✔
[3](#step-3) | Pass the filters via API instead using `liferay-frontend:management-bar-filters` tag | ✔
[4](#step-4) | Add the search | ✔
[5](#step-5) | Pass the view types via API instead using `<liferay-frontend:management-bar-buttons>` | ✔
[6](#step-6) | Pass the add button config via API instead using `<liferay-frontend:add-menu>` | ✔
[7](#step-7) | Pass the actions via API instead using `<liferay-frontend:management-bar-action-buttons>` | ✔
[8](#step-8) | Listen to the `Management Toolbar` events if needed (optional) | ✘

### [1] Locate the code in your application <a id="step-1"></a>

Locate the code responsible for rendering the **management-bar** in your application. It should resemble something like the following snippet found in [asset-tags-admin-web/view.jsp](https://github.com/liferay/liferay-portal/blob/master/modules/apps/web-experience/asset/asset-tags-admin-web/src/main/resources/META-INF/resources/view.jsp#L28):

```text/html
<liferay-frontend:management-bar
	disabled="<%= assetTagsDisplayContext.isDisabledTagsManagementBar() %>"
	includeCheckBox="<%= true %>"
	searchContainerId="assetTags"
>
	...
</liferay-frontend:management-bar>
	
```

### [2] Use `clay:management-toolbar` instead of the old `liferay-frontend:management-bar` tag <a id="step-2"></a>

Start by adding the following imports to the imports section of your `init.jsp` file:

```text/html
// Import the clay tld file to be able to use the new tag
<%@ taglib uri="http://liferay.com/tld/clay" prefix="clay" %>

// Import the NavigationItem utility class to create the items model
<%@ page import="com.liferay.frontend.taglib.clay.servlet.taglib.util.JSPDropdownItemList" %>
<%@ page import="com.liferay.frontend.taglib.clay.servlet.taglib.util.JSPViewTypeItemList" %>
```

Don't forget to add the dependencies with to the `frontend-taglib-clay` and `fronteng.taglib.soy` module in your `build.gradle` file:

```text/html
provided group: "com.liferay", name: "com.liferay.frontend.taglib.soy", version: "1.0.0"

provided project(":apps:foundation:frontend-taglib:frontend-taglib-clay")
```

#### Param changes
- `disabled` param is not passed anymore. Now a Management Toolbar will be disabled if `totalItems` is 0.
- `includeCheckBox` param is now `selectable`.
- If `namespace` is passed the params `searchFormName`, `searchFormInput` y `searchContainerId` will be automatically namespaced.

```text/html
<clay:management-toolbar
	namespace="<%= renderResponse.getNamespace() %>"
	selectable="<%= true %>"
	searchContainerId="assetTags"
	totalItems="<%= assetTagsDisplayContext.getTagsSearchContainer().getTotal() %>"
/>
```

### [3] Pass the filters via API instead using `liferay-frontend:management-bar-filters` tag <a id="step-3"></a>

Filters and order are now inside an unique dropdown.

Locate the code responsible for rendering the **management-bar-filters** in your application. It should resemble something like the following snippet found in [asset-tags-admin-web/view.jsp](https://github.com/liferay/liferay-portal/blob/master/modules/apps/web-experience/asset/asset-tags-admin-web/src/main/resources/META-INF/resources/view.jsp#L33):

```text/html
<liferay-frontend:management-bar-filters>
	<liferay-frontend:management-bar-navigation
		navigationKeys='<%= new String[] {"all"} %>'
		portletURL="<%= renderResponse.createRenderURL() %>"
	/>

	<liferay-frontend:management-bar-sort
		orderByCol="<%= assetTagsDisplayContext.getOrderByCol() %>"
		orderByType="<%= assetTagsDisplayContext.getOrderByType() %>"
		orderColumns='<%= new String[] {"name", "usages"} %>'
		portletURL="<%= portletURL %>"
	/>

	<c:if test="<%= assetTagsDisplayContext.isShowTagsSearch() %>">
		<li>
			<aui:form action="<%= portletURL %>" name="searchFm">
				<liferay-ui:input-search markupView="lexicon" />
			</aui:form>
		</li>
	</c:if>
</liferay-frontend:management-bar-filters>
```

Now model the filters using the `JSPDropdownItemList` class and pass it down to the tag instance. Also is needed to pass the `sortingOrder` to render the sorting button.

The Management Toolbar also accepts a param `showFiltersDoneButton` to indicate if we want to show the "Done" Button in the filters dropdown. Is tru by default

```text/html
JSPDropdownItemList orderByDropdownItemList = new JSPDropdownItemList(pageContext) {
	{
		add(
			dropdownItem -> {
				PortletURL nameURL = renderResponse.createRenderURL();
				nameURL.setParameter("keywords", assetTagsDisplayContext.getKeywords());
				nameURL.setParameter("orderByType", assetTagsDisplayContext.getOrderByType());
				nameURL.setParameter("orderByCol", "name");

				dropdownItem.setHref(nameURL);
				dropdownItem.setLabel(LanguageUtil.get(request, "name"));
			}
		);

		add(
			dropdownItem -> {
				PortletURL usagesURL = renderResponse.createRenderURL();
				usagesURL.setParameter("keywords", assetTagsDisplayContext.getKeywords());
				usagesURL.setParameter("orderByType", assetTagsDisplayContext.getOrderByType());
				usagesURL.setParameter("orderByCol", "usages");

				dropdownItem.setHref(usagesURL);
				dropdownItem.setLabel(LanguageUtil.get(request, "usages"));
			}
		);
	}
};

<clay:management-toolbar
	filterItems="<%=
		new JSPDropdownItemList(pageContext) {
			{
				addGroup(
					dropdownGroupItem -> {
						dropdownGroupItem.setLabel(LanguageUtil.get(request, "order-by")");
						dropdownGroupItem.setDropdownItems(orderByDropdownItemList);
					}
				);
			}
		}
	%>"
	namespace="<%= renderResponse.getNamespace() %>"
	selectable="<%= true %>"
	searchContainerId="assetTags"
	showFiltersDoneButton="<%= false %>"
	sortingOrder="<%= assetTagsDisplayContext.getOrderByType() %>"
	totalItems="<%= assetTagsDisplayContext.getTagsSearchContainer().getTotal() %>"
/>
```

### [4] Add the search <a id="step-4"></a>

Search will be render by default and we can pass some params to configure it.

- `searchActionURL` is action url of the  search form.
- `searchFormName` is the name of the search form.
- `searchInputName` is the name of the text input of the search form.
- `searchValue` is the value of the text input of the search form. If is not passed it will be get automatically from the url param with the value of `searchInputName`.
- `showSearch` to indicate if we want to show the search form or not. True by default.

```text/html
<clay:management-toolbar
	filterItems="<%=
		new JSPDropdownItemList(pageContext) {
			{
				addGroup(
					dropdownGroupItem -> {
						dropdownGroupItem.setLabel(LanguageUtil.get(request, "order-by")");
						dropdownGroupItem.setDropdownItems(orderByDropdownItemList);
					}
				);
			}
		}
	%>"
	namespace="<%= renderResponse.getNamespace() %>"
	selectable="<%= true %>"
	searchActionURL="<%= portletURL.toString() %>"
	searchFormName="searchFm"
	searchInputName="<%= DisplayTerms.KEYWORDS %>"
	searchContainerId="assetTags"
	showFiltersDoneButton="<%= false %>"
	showSearch="<%= assetTagsDisplayContext.isShowTagsSearch() %>"
	sortingOrder="<%= assetTagsDisplayContext.getOrderByType() %>"
	totalItems="<%= assetTagsDisplayContext.getTagsSearchContainer().getTotal() %>"
/>
```

### [5] Pass the view types via API instead using `<liferay-frontend:management-bar-buttons>` <a id="step-5"></a>

Locate the code responsible for rendering the **management-bar-display-buttons** in your application. It should resemble something like the following snippet found in [asset-tags-admin-web/view.jsp](https://github.com/ealonso/liferay-portal/blob/master/modules/apps/web-experience/asset/asset-tags-admin-web/src/main/resources/META-INF/resources/view.jsp#L60):

```text/html
	<liferay-frontend:management-bar-display-buttons
		displayViews='<%= new String[] {"icon", "descriptive", "list"} %>'
		portletURL="<%= changeDisplayStyleURL %>"
		selectedDisplayStyle="<%= assetTagsDisplayContext.getDisplayStyle() %>"
	/>
```

Now model the view types using the `JSPViewTypeItemList` class and pass it down to the tag instance.

```text/html
<clay:management-toolbar
	filterItems="<%=
		new JSPDropdownItemList(pageContext) {
			{
				addGroup(
					dropdownGroupItem -> {
						dropdownGroupItem.setLabel(LanguageUtil.get(request, "order-by")");
						dropdownGroupItem.setDropdownItems(orderByDropdownItemList);
					}
				);
			}
		}
	%>"
	namespace="<%= renderResponse.getNamespace() %>"
	selectable="<%= true %>"
	searchActionURL="<%= portletURL.toString() %>"
	searchFormName="searchFm"
	searchInputName="<%= DisplayTerms.KEYWORDS %>"
	searchContainerId="assetTags"
	showFiltersDoneButton="<%= false %>"
	showSearch="<%= assetTagsDisplayContext.isShowTagsSearch() %>"
	sortingOrder="<%= assetTagsDisplayContext.getOrderByType() %>"
	totalItems="<%= assetTagsDisplayContext.getTagsSearchContainer().getTotal() %>"
	viewTypes="<%=
		new JSPViewTypeItemList(pageContext) {
			{
				addCardViewType(
					viewTypeItem -> {
						PortletURL viewTypeItemURL = renderResponse.createActionURL();
						viewTypeItemURL.setParameter("redirect", PortalUtil.getCurrentURL(request));
						viewTypeItemURL.setParameter("displayStyle", "icon");

						viewTypeItem.setActive(Objects.equals(assetTagsDisplayContext.getDisplayStyle(), "icon"));
						viewTypeItem.setHref(viewTypeItemURL.toString());
						viewTypeItem.setLabel("Cards");
					}
				);

				addListViewType(
					viewTypeItem -> {
						PortletURL viewTypeItemURL = renderResponse.createActionURL();
						viewTypeItemURL.setParameter("redirect", PortalUtil.getCurrentURL(request));
						viewTypeItemURL.setParameter("displayStyle", "descriptive");

						viewTypeItem.setActive(Objects.equals(assetTagsDisplayContext.getDisplayStyle(), "descriptive"));
						viewTypeItem.setHref(viewTypeItemURL.toString());
						viewTypeItem.setLabel("List");
					}
				);

				addTableViewType(
					viewTypeItem -> {
						PortletURL viewTypeItemURL = renderResponse.createActionURL();
						viewTypeItemURL.setParameter("redirect", PortalUtil.getCurrentURL(request));
						viewTypeItemURL.setParameter("displayStyle", "list");

						viewTypeItem.setActive(Objects.equals(assetTagsDisplayContext.getDisplayStyle(), "list"));
						viewTypeItem.setHref(viewTypeItemURL.toString());
						viewTypeItem.setLabel("Table");
					}
				);
			}
		}
	%>"
/>
```

### [6] Pass the add button config via API instead using `<liferay-frontend:add-menu>` <a id="step-6"></a>

Locate the code responsible for rendering the **add-menu** in your application. It should resemble something like the following snippet found in [asset-tags-admin-web/view.jsp](https://github.com/ealonso/liferay-portal/blob/master/modules/apps/web-experience/asset/asset-tags-admin-web/src/main/resources/META-INF/resources/view.jsp#L71):

```text/html
<liferay-frontend:add-menu inline="<%= true %>">
	<liferay-frontend:add-menu-item title='<%= LanguageUtil.get(request, "add-tag") %>' url="<%= editTagURL.toString() %>" />
</liferay-frontend:add-menu>
```

Now it could be passed a URL to make the add button act like a link or a `JSPDropdownItemList` to show a dropdown.

```text/html
<clay:management-toolbar
	creationMenu="<%= assetTagsDisplayContext.isShowAddButton() ? editTagURL : null %>"
	filterItems="<%=
		new JSPDropdownItemList(pageContext) {
			{
				addGroup(
					dropdownGroupItem -> {
						dropdownGroupItem.setLabel(LanguageUtil.get(request, "order-by")");
						dropdownGroupItem.setDropdownItems(orderByDropdownItemList);
					}
				);
			}
		}
	%>"
	namespace="<%= renderResponse.getNamespace() %>"
	selectable="<%= true %>"
	searchActionURL="<%= portletURL.toString() %>"
	searchFormName="searchFm"
	searchInputName="<%= DisplayTerms.KEYWORDS %>"
	searchContainerId="assetTags"
	showFiltersDoneButton="<%= false %>"
	showSearch="<%= assetTagsDisplayContext.isShowTagsSearch() %>"
	sortingOrder="<%= assetTagsDisplayContext.getOrderByType() %>"
	totalItems="<%= assetTagsDisplayContext.getTagsSearchContainer().getTotal() %>"
	viewTypes="<%=
		new JSPViewTypeItemList(pageContext) {
			{
				addCardViewType(
					viewTypeItem -> {
						PortletURL viewTypeItemURL = renderResponse.createActionURL();
						viewTypeItemURL.setParameter("redirect", PortalUtil.getCurrentURL(request));
						viewTypeItemURL.setParameter("displayStyle", "icon");

						viewTypeItem.setActive(Objects.equals(assetTagsDisplayContext.getDisplayStyle(), "icon"));
						viewTypeItem.setHref(viewTypeItemURL.toString());
						viewTypeItem.setLabel("Cards");
					}
				);

				addListViewType(
					viewTypeItem -> {
						PortletURL viewTypeItemURL = renderResponse.createActionURL();
						viewTypeItemURL.setParameter("redirect", PortalUtil.getCurrentURL(request));
						viewTypeItemURL.setParameter("displayStyle", "descriptive");

						viewTypeItem.setActive(Objects.equals(assetTagsDisplayContext.getDisplayStyle(), "descriptive"));
						viewTypeItem.setHref(viewTypeItemURL.toString());
						viewTypeItem.setLabel("List");
					}
				);

				addTableViewType(
					viewTypeItem -> {
						PortletURL viewTypeItemURL = renderResponse.createActionURL();
						viewTypeItemURL.setParameter("redirect", PortalUtil.getCurrentURL(request));
						viewTypeItemURL.setParameter("displayStyle", "list");

						viewTypeItem.setActive(Objects.equals(assetTagsDisplayContext.getDisplayStyle(), "list"));
						viewTypeItem.setHref(viewTypeItemURL.toString());
						viewTypeItem.setLabel("Table");
					}
				);
			}
		}
	%>"
/>
```

### [7] Pass the actions via API instead using `<liferay-frontend:management-bar-action-buttons>` <a id="step-7"></a>

Locate the code responsible for rendering the **action-buttons** in your application. It should resemble something like the following snippet found in [asset-tags-admin-web/view.jsp](https://github.com/ealonso/liferay-portal/blob/master/modules/apps/web-experience/asset/asset-tags-admin-web/src/main/resources/META-INF/resources/view.jsp#L77):

```text/html
<liferay-frontend:management-bar-action-buttons>
	<liferay-frontend:management-bar-button href="javascript:;" icon="change" id="mergeSelectedTags" label="merge" />

	<liferay-frontend:management-bar-button href="javascript:;" icon="trash" id="deleteSelectedTags" label="delete" />
</liferay-frontend:management-bar-action-buttons>
```

Now model the actions using the `JSPDropdownItemList` class and pass it down to the tag instance.


```text/html
<clay:management-toolbar
	actionItems="<%=
		new JSPDropdownItemList(pageContext) {
			{
				add(
					dropdownItem -> {
						dropdownItem.setIcon("change");
						dropdownItem.setId("merge");
						dropdownItem.setLabel(LanguageUtil.get(request, "merge"));
						dropdownItem.setQuickAction(true);
					}
				);

				add(
					dropdownItem -> {
						dropdownItem.setIcon("trash");
						dropdownItem.setId("delete");
						dropdownItem.setLabel(LanguageUtil.get(request, "delete"));
						dropdownItem.setQuickAction(true);
					}
				);
			}
		}
	%>"
	creationMenu="<%= assetTagsDisplayContext.isShowAddButton() ? editTagURL : null %>"
	filterItems="<%=
		new JSPDropdownItemList(pageContext) {
			{
				addGroup(
					dropdownGroupItem -> {
						dropdownGroupItem.setLabel(LanguageUtil.get(request, "order-by")");
						dropdownGroupItem.setDropdownItems(orderByDropdownItemList);
					}
				);
			}
		}
	%>"
	namespace="<%= renderResponse.getNamespace() %>"
	selectable="<%= true %>"
	searchActionURL="<%= portletURL.toString() %>"
	searchFormName="searchFm"
	searchInputName="<%= DisplayTerms.KEYWORDS %>"
	searchContainerId="assetTags"
	showFiltersDoneButton="<%= false %>"
	showSearch="<%= assetTagsDisplayContext.isShowTagsSearch() %>"
	sortingOrder="<%= assetTagsDisplayContext.getOrderByType() %>"
	totalItems="<%= assetTagsDisplayContext.getTagsSearchContainer().getTotal() %>"
	viewTypes="<%=
		new JSPViewTypeItemList(pageContext) {
			{
				addCardViewType(
					viewTypeItem -> {
						PortletURL viewTypeItemURL = renderResponse.createActionURL();
						viewTypeItemURL.setParameter("redirect", PortalUtil.getCurrentURL(request));
						viewTypeItemURL.setParameter("displayStyle", "icon");

						viewTypeItem.setActive(Objects.equals(assetTagsDisplayContext.getDisplayStyle(), "icon"));
						viewTypeItem.setHref(viewTypeItemURL.toString());
						viewTypeItem.setLabel("Cards");
					}
				);

				addListViewType(
					viewTypeItem -> {
						PortletURL viewTypeItemURL = renderResponse.createActionURL();
						viewTypeItemURL.setParameter("redirect", PortalUtil.getCurrentURL(request));
						viewTypeItemURL.setParameter("displayStyle", "descriptive");

						viewTypeItem.setActive(Objects.equals(assetTagsDisplayContext.getDisplayStyle(), "descriptive"));
						viewTypeItem.setHref(viewTypeItemURL.toString());
						viewTypeItem.setLabel("List");
					}
				);

				addTableViewType(
					viewTypeItem -> {
						PortletURL viewTypeItemURL = renderResponse.createActionURL();
						viewTypeItemURL.setParameter("redirect", PortalUtil.getCurrentURL(request));
						viewTypeItemURL.setParameter("displayStyle", "list");

						viewTypeItem.setActive(Objects.equals(assetTagsDisplayContext.getDisplayStyle(), "list"));
						viewTypeItem.setHref(viewTypeItemURL.toString());
						viewTypeItem.setLabel("Table");
					}
				);
			}
		}
	%>"
/>
```

### [8] Listen to the `Management Toolbar` events if needed (optional) <a id="step-8"></a>

First is needed to pass a componentId to the tag.

```text/html
<clay:management-toolbar
	componentId="assetTagsManagementToolbar"
	...
/>
```

And now we can listen to when component is ready and then do what is needed, like in this example in assetTags.

```text/html
<aui:script>
	Liferay.componentReady('assetTagsManagementToolbar').then(managementToolbar => {
		managementToolbar.on('actionClicked', action => {
			if (action.id == 'merge') {
				<portlet:renderURL var="mergeURL">
					<portlet:param name="mvcPath" value="/merge_tag.jsp" />
					<portlet:param name="mergeTagIds" value="[$MERGE_TAGS_IDS$]" />
				</portlet:renderURL>

				let mergeURL = '<%= mergeURL %>';

				location.href = mergeURL.replace(escape('[$MERGE_TAGS_IDS$]'), Liferay.Util.listCheckedExcept(document.querySelector('#<portlet:namespace />fm'), '<portlet:namespace />allRowIds'));
			}
			else if (action.id == 'delete') {
				if (confirm('<liferay-ui:message key="are-you-sure-you-want-to-delete-this" />')) {
					submitForm(form);
				}
			}
		})
	});
</aui:script>
```

</article>

<article id="who-has-it-ready">

### Who has done it already?

LPS | Pull Request | Master
--- | --- | ---

</article>
