---
title: "jQuery"
description: ""
layout: "othersGuide"
weight: 1
clayTaglib: "Vanilla or Metal.js"
---

<article class="my-5 alert alert-warning">
AUI.$ returns a jQuery nodeList with many methods available. Replacing it with `document.querySelector` or `document.querySelectorAll` we lose all that methods.
</article>

<article class="my-5">

## How to migrate:

- Replace `AUI.$(selector)` with `document.querySelector(selector)` if expected result is one node.

- Replace `AUI.$(selector)` with `document.querySelectorAll(selector)` if expected result is more than one node. In this case you will have to iterate over the array to execute methods on each node if needed.

### Migrate methods:
   <div class="alert alert-info">
   Some methods can't be directly replaced with native implementations so we may need to use some utilities from metal like `metal-dom`. To do it we need to import the module in the jsp in the following way
   </div>

```htmlmixed
<aui:script require="metal-dom/src/dom">
  let dom = metalDomSrcDom.default;
  ...
</aui:script>
```

```htmlmixed
<aui:script require="metal-dom/src/domData">
  let domData = metalDomSrcDomData.default;
  ...
</aui:script>
```


  ### Direct replacements

  jQuery | replacement
  --- | ---
  `.addClass()` | `dom.addClasses(element, classes)`
  `.append()` | `dom.append(parent, child)`
  `.attr(attribute)` | `.getAttribute(attribute)`
  `.attr(attribute, value)` | `.setAttribute(attribute, value)`
  `.closest()` | TODO
  `.collapse()` | TODO
  `.data()` | `domData.get(element, 'propertyName')`
  `.data(value)` | `domData.set(element, 'propertyName', value)`
  `.each()` | `.forEach`
  `.find()` | `.querySelector()` or `querySelectorAll()`
  `.formToArray()` | TODO
  `.html()` | `.innerHTML`
  `.html(value)` | `.innerHTML = value`
  `.map()` | `[...document.querySelectorAll(selector)].map()`
  `.on()` | `addEventListener()`
  `.one()` | `dom.once(element, eventName, fn)`
  `.prepend()` | TODO
  `.prop('property')` | `element.property`
  `.prop('property', value)` | `element.property = value`
  `.ready(fn)` | `document.addEventListener('DOMContentLoaded', fn, false)` <br> `window.addEventListener('load', fn,false)`
  `.remove()` | `dom.exitDocument(element)`
  `toggleClass('class')` | `dom.toggleClasses(element, 'class')`
  `.tooltip()` | TODO
  `.val()` | `.value`
  `.val(newValue)` | `.value = newValue`


  ### Code replacements

  - Replace `.ajaxSubmit()` with
    ```javascript
    fetch(url, {
      body: new FormData(form),
      credentials: 'include',
      method: 'POST',
      ...
    })
    .then(response => ...);
    ```

  - Replace `.load()` with
    ```javascript
    fetch(url, data)
    .then(response => {
      element.innerHTML = response;
    });
    ```

  - Replace `.serializeArray()` with
    ```javascript
      form
      dom.exitDocument(element)
    ```

  - Replace `.sideNavigation()` TODO.

  - Replace `.toggle()` with
    ```javascript
    if (element.style.display === 'none')
      element.style.display = 'block';
    else
      element.style.display = 'none';
    ```

</article>
