---
title: "aui:icon"
description: ""
layout: "guide"
weight: 1
---

<article>

# INCOMPLETE: WAITING FOR FINAL ICONS DEFINITION

## Problems and notes:
- If url is passed the icon svg is wrapped inside a link (ATag).
- If url is not passed the icon svg is wrapped inside a span.
- Current taglib accepts param “data” that is only being used in product-navigation-control-menu-web/.../view_category.jsp and ClayIcon doesn’t accept this param.
- Current taglib accepts param “label”. ClayIcon doesn’t accept this param.
- Current taglib accepts params “target” and “url” to wrap icon inside a link with this attributes. ClayIcon doesn’t accept that.
- Current taglib accepts param “src” that now is called “spritemap”. If no spritemap is defined it will be setted automatically to themeDisplay.getPathThemeImages().concat("/clay/icons.svg")

</article>

<article>

## Proposed solutions:
- Add “wrapped” boolean param to ClayIcon to wrap the icon inside a span.
- For the “data” param see if it can be used in a different way in that jsp
- For the label param: ClayIcon is to render an icon. If we want to print a label I’d print it apart.
- Target and Url params: Use clay:link.

</article>

<article>

## How to migrate:
- If is used as a link (passing url / target) use clay:link instead.
- Change cssClass param to elementClasses.
- Change image param to symbol.
- Change src param to spritemap.
- Remove “icon-monospaced” from classes and add the param monospaced equals to true.

</article>

<article>

## Examples:

From:
```Taglib use
<aui:icon cssClass="my-class icon-monospaced" id="myId" image="my-icon" label="My Label" />
```
```html result
<span class="my-class icon-monospaced" id="myId">
  <svg class="lexicon-icon lexicon-icon-my-icon" focusable="false" role="img" title="">
    <use data-href="whatever/lexicon/icons.svg" />
    <title>my-icon</title>
  </svg>
</span>
```
	
To:
```Taglib use
My Label <clay:icon elementClasses="my-class" id="myId" monospaced="true" symbol="my-icon" />
```
```html result
My Label
<svg aria-hidden="true" class="lexicon-icon lexicon-icon-my-icon icon-monospaced" id="myId">
  <use xlink:href="whatever/lexicon/icons.svg#my-icon" />
</svg>
```

</article>