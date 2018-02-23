---
title: Add Menu
description: ""
layout: "lexiconMigrationGuide"
weight: 100

clayComponentLink: "https://claycss.com/docs/components/management_toolbar.html"
lexiconPattern: "Add Menu"
lexiconPatternLink: "https://lexicondesign.io/docs/patterns/Toolbars/management_bar.html"
---

<article id="before-after">

### How does it look like now (7.0)

<img class="img img-thumbnail" src="/images/lexiconMigration/add_menu_old.png">

### Changes for Lexicon 2.0 (7.1)

<img class="img img-thumbnail" src="/images/lexiconMigration/add_menu_new.png">

Change | Reason
--- | ---
① The **add menu is moved into the Management Toolbar** | _

</article>

<article id="steps">

### How to apply it?

_ | Action | Mandatory
--- | --- | ---
[1](#step-1) | Locate the code in your application | ✔
[2](#step-2) | Move the add menu into the management toolbar | ✔

#### [1] Locate the code in your application <a id="step-1"></a>

Locate the code responsible for rendering the **add menu** in your application. It should resemble something like the following snippet found in [fragment-web/view.jsp](https://github.com/liferay/liferay-portal/blob/master/modules/apps/web-experience/fragment/fragment-web/src/main/resources/META-INF/resources/view.jsp#L119-L127):

```text/html
<c:if test="<%= fragmentDisplayContext.isShowAddButton(FragmentActionKeys.ADD_FRAGMENT_COLLECTION) %>">
    <portlet:renderURL var="addFragmentCollectionURL">
        <portlet:param name="mvcRenderCommandName" value="/fragment/edit_fragment_collection" />
    </portlet:renderURL>

    <liferay-frontend:add-menu inline="<%= true %>">
        <liferay-frontend:add-menu-item title='<%= LanguageUtil.get(request, "add-collection") %>' url="<%= addFragmentCollectionURL.toString() %>" />
    </liferay-frontend:add-menu>
</c:if>
```

Locate the code responsible for rendering the **management toolbar** in your application. It should resemble something like the following snippet found in [fragment-web/view.jsp](https://github.com/liferay/liferay-portal/blob/master/modules/apps/web-experience/fragment/fragment-web/src/main/resources/META-INF/resources/view.jsp#L28-L32):

```text/html
<liferay-frontend:management-bar
	disabled="<%= fragmentDisplayContext.isDisabledFragmentCollectionsManagementBar() %>"
	includeCheckBox="<%= true %>"
	searchContainerId="fragmentCollections"
>
    ...
</liferay-frontend:management-bar>
```

#### [2] Move the add menu into the management toolbar <a id="step-2"></a>

Move the part in charge of the search into the `liferay-frontend:management-bar` section, right after the last of the `liferay-frontend-management-bar-buttons` item like it's shown in the following snippet.

```text/html
<liferay-frontend:management-bar-buttons>
    ...

    <c:if test="<%= fragmentDisplayContext.isShowAddButton(FragmentActionKeys.ADD_FRAGMENT_COLLECTION) %>">
        <portlet:renderURL var="addFragmentCollectionURL">
            <portlet:param name="mvcRenderCommandName" value="/fragment/edit_fragment_collection" />
        </portlet:renderURL>

        <liferay-frontend:add-menu inline="<%= true %>">
            <liferay-frontend:add-menu-item title='<%= LanguageUtil.get(request, "add-collection") %>' url="<%= addFragmentCollectionURL.toString() %>" />
        </liferay-frontend:add-menu>
    </c:if>
</liferay-frontend:management-bar-buttons>
```
</article>

<article id="who-has-it-ready">

### Who has done it already?

LPS | Pull Request | Master
--- | --- | ---
[LPS-77502](https://issues.liferay.com/browse/LPS-77502) | [https://github.com/brianchandotcom/liferay-portal/pull/54812](https://github.com/brianchandotcom/liferay-portal/pull/54812) | ✘

</article>
