---
title: "liferay-ui:alert"
description: ""
layout: "guide"
weight: 1
---

<article>

## Problems and notes:
- `animationTime` param is no longer available.

- `cssClass` param is not supported (neither elementClasses is implemented), but nobody is using it.

- `icon` param is no longer supported. Alert icons are predefined depending on the alert style (i.e. `danger` style -> `exclamation-full` icon)

- `targetNode` was used to render component into a specific container. We need to make sure that this is really a need and, if so, make a different component with this behaviour. For now, this feature is not available.

- `timeout` param is no longer supported. Now the component has predefined an autoclosing time and to make an alert autocloseable we need to pass it the param `autoClose=true`.

- `type` param is now used to specify the type of the alert (regular, fluid or notification) and new param `style` take its place to define if is a danger, info, success or warning alert.

</article>

<article>

## How to migrate:

- Remove `animationTime` param.

- Remove `icon` param and make sure to pass the `style` of the alert (danger, info, success or warning).

- Make sure if `targetNode` is really needed and what we have to do can't be done in another way. If not... ask.

- Remove `timeout` param. If you want your alert to be closed automatically pass `autoClose=true` param.

- Use `type` param to specify wich kind of alert you need (regular, fluid or notification).

</article>

<article>

## Examples:

From:
```Taglib use
<liferay-ui:alert
  icon="exclamation-full"
  message='My message'
  timeout="2000"
  title="Error"
  type="danger"
/>
```
```html result
<div class="lfr-alert-container">
  <div class="container-fluid-1280 lfr-alert-wrapper">
    <div class="alert-success alert-success-content alert liferayalert liferayalert-content alert-dismissable " aria-hidden="false">
      <div>
        <strong class="lead">
          <svg class="lexicon-icon" focusable="false">
            <use .../>
            <title>Error</title>
          </svg>
          Error
        </strong>
        My message
      </div>
    </div>
  </div>
</div>
```

To:
```Taglib use
<clay:alert
  autoClose="true"
  message="My message"
  style="danger"
  title="Error"
  type="fluid"
/>
```
```html result
<div class="alert alert-danger fade show" role="alert">
  <svg aria-hidden="true" class="lexicon-icon lexicon-icon-exclamation-full">
    <use ...></use>
  </svg>
  <strong class="lead">Error</strong>
  My message
</div>
```

</article>