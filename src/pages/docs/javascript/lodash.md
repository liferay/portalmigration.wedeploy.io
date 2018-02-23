---
title: Lodash
description: ""
layout: "guide"
weight: 100
clayTaglib: "Vanilla or Metal.js"
---

<article id="how-to-migrate">

### How to migrate:

#### Direct replacements
  lodash | replacement
  --- | ---
  `_.bind` | to native `.bind`.
  `_.bindKey` | there's no direct replacement.
  `_.escape` | there's no direct replacement.
  `_.groupBy` | there's no direct replacement.
  `_.isEqual` | there's no direct replacement.
  `_.map` | to native `Array.map`.
  `_.reduce` | to native `Array.reduce`.
  `_.unescape` | there's no direct replacement.
  `_.sub` | there's no direct replacement.
  `_.without` | there's no direct replacement.

#### Code replacements
- `_.debounce` to `metal-debounce`.
  ```htmlmixed
  <aui:script require="metal-debounce/src/debounce">
    let debounce = metalDebounceSrcDebounce.default;
    debounce(fn, time);
  </aui:script>
  ```

- `_.forEach` to `.forEach` or `for in`
  ```javascript
  [1,2,3].forEach((item) => {
    console.log(item);
  });

  let obj = {a:1, b:2, c:3};
  for(key in obj) {
    console.log(item);
  }
  ```

- `_.isFunction` to
  ```javascript
    function isFunction(fn) {
      return (!!fn && ("object" == typeof fn || "function" == typeof fn)) && toString.call(fn) == '[object Function]'
    }
  ```

</article>