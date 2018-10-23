---
parent: Management Toolbar
title: Selectable with Contextual Actions
description: ""
layout: "lexiconMigrationGuide"
weight: 100

clayComponentLink: "https://clayui.com/docs/components/toolbars/management-toolbar.html"
lexiconPattern: "Management Toolbar"
lexiconPatternLink: "https://lexicondesign.io/docs/patterns/Toolbars/management_bar.html"
---

<article id="before-after">

### How does it look like now (7.1)

<img class="img img-thumbnail" src="/images/lexiconMigration/management_toolbar_contextual_actions_old.png">

### Changes for 7.2

<img class="img img-thumbnail" src="/images/lexiconMigration/management_toolbar_contextual_actions_new.png">

Change | Reason
--- | ---
① Quick Actions state depends on the current selection | When a user selects different items, it's preferred to show only the globally allowed operations
① Actions state depends on the current selection | When a user selects different items, it's preferred to show only the globally allowed operations

</article>

<article id="management-toolbar-selectable-with-contextual-actions">

#### How to apply it?

_ | Action | Mandatory
--- | --- | ---
[1](#step-1) | Locate the code in your application | ✔
[2](#step-2) | Add the allowed "actions" list to the row data | ✔

### [1] Locate the code in your application <a id="step-1"></a>

Locate the code responsible for rendering the **search-container-row** in your application. It should resemble something like the following snippet found in [blogs_admin/view_entries.jsp](https://github.com/liferay/liferay-portal/blob/master/modules/apps/blogs/blogs-web/src/main/resources/META-INF/resources/blogs_admin/view_entries.jsp#L93-L98):

```text/html
<liferay-ui:search-container
    id="blogEntries"
    rowChecker="<%= new EmptyOnClickRowChecker(renderResponse) %>"
    searchContainer="<%= entriesSearchContainer %>"
>
    <liferay-ui:search-container-row
        className="com.liferay.blogs.model.BlogsEntry"
        escapedModel="<%= true %>"
        keyProperty="entryId"
        modelVar="entry"
    >
	...
    </liferay-ui:search-container-row>

    <liferay-ui:search-iterator
        displayStyle="<%= displayStyle %>"
        markupView="lexicon"
    />
</liferay-ui:search-container>
```

### [2] Add the allowed "actions" list to the row data tag <a id="step-2"></a>

Make the necessary checks to retrieve the row entry available actions and set an "actions" entry in the
row data with the comma-separated list of actions for that row

```text/html
<%
Map<String, Object> rowData = new HashMap<>();

/**
 * Set a comma-separated list of action ids (see your actionDropdownItems)
 * rowData.put("actions", "checkin,download,move");
 */

rowData.put("actions", myDisplayContext.getAvailableActions(entry)));

row.setData(rowData);
%>
```

Keep in mind that the actions should match the `id`s for the actions you are passing to the toolbar as `actionDropdownItems`

</article>

<article id="who-has-it-ready">

### Who has done it already?

LPS | Pull Request | Master
--- | --- | ---
[LPS-85197](https://issues.liferay.com/browse/LPS-85197) | [https://github.com/brianchandotcom/liferay-portal/pull/63070](https://github.com/brianchandotcom/liferay-portal/pull/63070) | ✔
[LPS-85198](https://issues.liferay.com/browse/LPS-85198) | [https://github.com/brianchandotcom/liferay-portal/pull/63231](https://github.com/brianchandotcom/liferay-portal/pull/63231) | ✔
[LPS-85199](https://issues.liferay.com/browse/LPS-85199) | [https://github.com/brianchandotcom/liferay-portal/pull/63214](https://github.com/brianchandotcom/liferay-portal/pull/63214) | ✔
[LPS-85200](https://issues.liferay.com/browse/LPS-85200) | [https://github.com/brianchandotcom/liferay-portal/pull/63234](https://github.com/brianchandotcom/liferay-portal/pull/63234) | ✔
[LPS-85201](https://issues.liferay.com/browse/LPS-85201) | [https://github.com/brianchandotcom/liferay-portal/pull/63249](https://github.com/brianchandotcom/liferay-portal/pull/63249) | ✔
[LPS-85202](https://issues.liferay.com/browse/LPS-85202) | [https://github.com/brianchandotcom/liferay-portal/pull/63253](https://github.com/brianchandotcom/liferay-portal/pull/63253) | ✔

</article>
