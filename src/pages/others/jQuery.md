---
title: "jQuery.$"
description: ""
layout: "othersGuide"
weight: 1
clayTaglib: "document.querySelector"
---

<article class="my-5">

## Problems and notes:
- AUI.$ returns a jQuery nodeList with many methods available. Replacing it with `document.querySelector` or `document.querySelectorAll` we lose all that methods.

</article>

<article class="my-5">

## How to migrate:

- Replace `AUI.$(selector)` with `document.querySelector(selector)` if expected result is one node.

- Replace `AUI.$(selector)` with `document.querySelectorAll(selector)` if expected result is more than one node. In this case you will have to iterate over the array to execute methods on each node if needed.

- Migrate methods:

   - Note: Some methods can't be directly replaced with native implementations so we may need to use some utilities from metal like `metal-dom`. To do it we need to import the module in the jsp in the following way:
      ```
      <aui:script require="metal-dom/src/dom">
        let dom = metalDomSrcDom.default;
        ...
      </aui:script>
      ```
      or

      ```
      <aui:script require="metal-dom/src/domData">
        let domData = metalDomSrcDomData.default;
        ...
      </aui:script>
      ```

  - Replace `.addClass()` with `dom.addClasses(element, classes)`.

  - Replace `.ajaxSubmit()` with 
    ```
    fetch(url, {
      body: new FormData(form),
      credentials: 'include',
      method: 'POST',
      ...
    })
    .then(response => ...);
    ```

  - Replace `.append()` with `dom.append(parent, child)`.

  - Replace `.attr(attribute)` with `.getAttribute(attribute)`.

  - Replace `.attr(attribute, value)` with `.setAttribute(attribute, value)`.

  - Replace `.closest()` TODO.

  - Replace `.collapse()` TODO.

  - Replace `.data()` with `domData.get(element, 'propertyName')`.

  - Replace `.data(value)` with `domData.set(element, 'propertyName', value)`.

  - Replace `.each()` with `.forEach`.

  - Replace `.find()` with `.querySelector()` or `querySelectorAll()`.

  - Replace `.formToArray()` TODO

  - Replace `.html()` with `.innerHTML`.

  - Replace `.html(value)` with `.innerHTML = value`.

  - Replace `.load()` with
    ```
    fetch(url, data)
    .then(response => {
      element.innerHTML = response;
    });
    ```

  - Replace `.map()` with `[...document.querySelectorAll(selector)].map()`

  - Replace `.on()` with `addEventListener()`.

  - Replace `.one()` with `dom.once(element, eventName, fn)`.

  - Replace `.prepend()` TODO.

  - Replace `.prop('property')` with `element.property`.

  - Replace `.prop('property', value)` with `element.property = value`.

  - Replace `.ready(fn)` with `document.addEventListener('DOMContentLoaded', fn, false)` or `window.addEventListener('load', fn, false)`

  - Replace `.remove()` with `dom.exitDocument(element)`.

  - Replace `.serializeArray()` with 
    ```
      form
      dom.exitDocument(element)
    ```

  - Replace `.sideNavigation()` TODO.

  - Replace `.toggle()` with 
    ```
    if (element.style.display === 'none')
      element.style.display = 'block';
    else
      element.style.display = 'none';
    ```

  - Replace `toggleClass('class')` with `dom.toggleClasses(element, 'class')`.

  - Replace `.tooltip()` TODO.

  - Replace `.val()` with `.value`.

  - Replace `.val(newValue)` with `.value = newValue`.






</article>
