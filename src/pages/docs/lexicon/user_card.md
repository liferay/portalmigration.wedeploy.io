---
title: User Card
description: ""
layout: "lexiconMigrationGuide"
weight: 102

clayComponentLink: "https://claycss.com/docs/components/cards.html"
lexiconPattern: "User Card"
lexiconPatternLink: "https://lexicondesign.io/docs/patterns/cards.html"
---

<article id="before-after">

### How does it look like now (7.0)

<img class="img img-thumbnail" src="/images/lexiconMigration/user_card_old.png">

### Changes for Lexicon 2.0 (7.1)

<img class="img img-thumbnail" src="/images/lexiconMigration/user_card_new.png">

Change | Reason
--- | ---
① The **icons spritemap** has changed | Fit with the new Lexicon icons
② The **link style** now is black, blue on hover. Also the entire card has hover state | Fit with new links styles and better visual feedback


</article>

<article id="steps">

### How to apply it?

_ | Action | Mandatory
--- | --- | ---
[1](#step-1) | Locate the code in your application | ✔
[2](#step-2) | Use `clay:user-card` instead of the old `liferay-frontend:user-vertical-card` tag | ✔
[3](#step-3) | Move the action items definition into a Display Context | ✘

### [1] Locate the code in your application <a id="step-1"></a>

Locate the code responsible for rendering the **image card** in your application. It should resemble something like the following snippet found in [users-admin/users-admin-web/user/search_columns.jspf](https://github.com/liferay/liferay-portal/blob/master/modules/apps/foundation/users-admin/users-admin-web/src/main/resources/META-INF/resources/user/search_columns.jspf#L49-L59):

```text/html
<liferay-frontend:user-vertical-card
	actionJsp="/user_action.jsp"
	actionJspServletContext="<%= application %>"
	cssClass="entry-display-style"
	resultRow="<%= row %>"
	rowChecker="<%= rowChecker %>"
	subtitle="<%= user2.getScreenName() %>"
	title="<%= user2.getFullName() %>"
	url="<%= String.valueOf(rowURL) %>"
	userId="<%= user2.getUserId() %>"
/>
```

### [2] Use `clay:user-card` instead of the old `liferay-frontend:user-vertical-card` tag <a id="step-2"></a>

Start by adding the following imports to the imports section of your `init.jsp` file:

```text/html
// Import the clay tld file to be able to use the new tag
<%@ taglib uri="http://liferay.com/tld/clay" prefix="clay" %>

// Import the DropdownItem utility class to create the items model
<%@ page import="com.liferay.frontend.taglib.clay.servlet.taglib.util.JSPDropdownItemList" %>
```

Don't forget to add the dependencies with to the `frontend-taglib-clay` and `fronteng.taglib.soy` module in your `build.gradle` file:

```text/html
provided group: "com.liferay", name: "com.liferay.frontend.taglib.soy", version: "1.0.0"

provided project(":apps:foundation:frontend-taglib:frontend-taglib-clay")
```

- Url param is now href.
- Text param is now title.
- Icon is passed now trough icon param instead as a content with `horizontal-card-col` and `horizontal-card-col-icon`
- For the actions you need to model them using the `JSPDropdownItemList` class.

```text/html
<clay:user-card
	actionItems="<%=
		new JSPDropdownItemList(pageContext) {
				{
					if (hasUpdatePermission) {
						add(
								dropdownItem -> {
										PortletURL editUserURL = renderResponse.createRenderURL();
										editUserURL.setParameter("mvcRenderCommandName", "/users_admin/edit_user");
										editUserURL.setParameter("redirect", redirect);
										editUserURL.setParameter("p_u_i_d", String.valueOf(userId));

										dropdownItem.setHref(editUserURL);
										dropdownItem.setLabel(LanguageUtil.get(request, "edit"));
								}
						);
					}
				}
		}
	%>"
	elementClasses="entry-display-style"
	href="<%= String.valueOf(rowURL) %>"
	initials="<%= user2.getInitials() %>"
	inputValue="<%= user2.getFullName() %>"
	name="<%= user2.getFullName() %>"
	resultRow="<%= row %>"
	rowChecker="<%= rowChecker %>"
	subtitle="<%= user2.getScreenName() %>"
/>
```

Check out the following [Sample usage of JSPNavigationItemList](https://github.com/liferay/liferay-portal/commit/1ab9c006c750052f5c1c7df7072aab961b89966c) for more information about it.

### [3] Move the action items definition into a Display Context <a id="step-3"></a>

<div class="alert alert-info">This step is <em>optional</em> but <strong>recommended</strong></div>

If your application already supports it (or even if it doesn't), consider moving the `Java` portion that generates the navigation items model into a `*DisplayContext` pattern to keep your jsps cleaner and server-free

```text/html
<clay:user-card
	actionItems="<%= myAppAdminViewDisplayContext.getActionItems() %>"
	elementClasses="entry-display-style"
	href="<%= String.valueOf(rowURL) %>"
	initials="<%= user2.getInitials() %>"
	inputValue="<%= user2.getFullName() %>"
	name="<%= user2.getFullName() %>"
	resultRow="<%= row %>"
	rowChecker="<%= rowChecker %>"
	subtitle="<%= user2.getScreenName() %>"
/
```

Check out the following [Sample usage of DropdownItemList](https://github.com/brianchandotcom/liferay-portal/pull/55548/commits/564cd7d6579bd9230bd9b999ef12e4eb21e38501) for more information about it.

</article>

<article id="who-has-it-ready">

### Who has done it already?

LPS | Pull Request | Master
--- | --- | ---

</article>
