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
  `_.escape` | to `Liferay.Util.escape`.
  `_.groupBy` | to `Lifeay.Util.groupBy`.
  `_.isEqual` | to `Liferay.Util.isEqual`.
  `_.map` | to native `Array.map`.
  `_.reduce` | to native `Array.reduce`.
  `_.unescape` | to `Liferay.Util.unescape`.
  `_.sub` | to `Liferay.Util.sub`.
  `_.without` | there's no direct replacement.

> Tip: In general, if you need a specific [`lodash`](https://github.com/lodash/lodash) function in your application, you can add it as a dependency via `npm`.
 Keep in mind that `lodash` exports [all](https://www.npmjs.com/search?q=keywords:lodash-modularized) of it's methods as individual `npm` modules, which avoids bringing the whole `lodash` library
in your code.

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
  for (key in obj) {
    console.log(item);
  }
  ```

- `_.isFunction` to
  ```javascript
    var isFunction = function(val) {
      return typeof val === 'function';
    };

    var myFunction = function(a, b) {
      return a + b;
    };

    console.log(isFunction(myFunction)); // true
  ```

  If you are using ES5 JavaScript

  or

  ```javascript
  import {core} from 'metal';

  const myFunction = (a, b) => a + b;

  console.log(core.isFunction(myFunction)); // true
  ```

  If you are using ES6 JavaScript

</article>