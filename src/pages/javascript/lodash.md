---
title: "Lodash"
description: ""
layout: "othersGuide"
weight: 1
clayTaglib: ""
---

<article class="my-5">

## How to migrate:

- `_.bind` to native `.bind`.
- `_.bindKey` there's no direct replacement.
- `_.debounce` to `metal-debounce`.
  ```
  <aui:script require="metal-debounce/src/debounce">
    let debounce = metalDebounceSrcDebounce.default;
    debounce(fn, time);
  </aui:script>
  ```

- `_.escape` there's no direct replacement.

- `_.forEach` to `.forEach` or `for in`
  ```
  [1,2,3].forEach((item) => {
    console.log(item);
  });

  let obj = {a:1, b:2, c:3};
  for(key in obj) {
    console.log(item);
  }
  ```

- `_.groupBy` there's no direct replacement.
- `_.isEqual` there's no direct replacement.
- `_.isFunction` to
  ```
    function isFunction(fn) {
      return (!!fn && ("object" == typeof fn || "function" == typeof fn)) && toString.call(fn) == '[object Function]'
    }
  ```
- `_.map` to native `Array.map`.
- `_.reduce` to native `Array.reduce`.
- `_.unescape` there's no direct replacement.
- `_.sub` there's no direct replacement.
- `_.without` there's no direct replacement.


</article>
