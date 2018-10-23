---
title: Accessibility
layout: "tips"
weight: 200
---

<div class="alert alert-info">
    Please, keep in mind that cognitive disabilities are among the  most common ones. They require from our designs and developments to produce clear and direct messages that simplify the understanding of our apps. Our interface will be designed by UX designers to be clear but we need to make sure the interface can be read clearly out of context. Try to keep this in mind during your accessibility reviews.
</div>

<article id="accessibility">

### Keyboard navigation:

- All links and buttons should be accessible by keyboard.
- Avoid keyboard traps (keyboard tab loops).
- Control the lineal focus direction, it must follow a correct visual and logic order.
- Create a keyboard widget if the component is complex, for example; a table with order/actions/filters.

### Semantics

- All visual content in interfaces need text title or description.
- A simple button / link can be confusing. Try to make sure your button's intent is clear. For example, an icon button must provide a description text using the class `.sr-only` (screen reader only).
- Use CSS/HTML validators. Tools like [Axe accessibility](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd) bar can help you a lot.

### Screen Readers

There are a lot of different screen readers, offered by OS, browser, from open source and paid apps but mainly there are two ways to read screen content: by a touchable device or a regular tabulation.

Touchable screens readers can be tested with iOS or Android activating its accessibility readers. In case of you use iOS the screen reader is [VoiceOver](https://www.apple.com/voiceover/info/guide/_1124.html) and it has a similar behaviour than Mac version.

To test in desktop you can use the native OS screen reader or a browser plugin like [ChromeVox](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=es-419).

We need to determine if buttons, links, titles and rest of meaning items have sense in a set or individually. For example:

<img class="img img-thumbnail" src="/images/lexiconMigration/accessibility_example.png">

Visually the title “Add” makes sense becuase we see it inside the “Dynamic Data Lists” group. In a linear reading we have a dropdown, a navigation and all options of management bar between `Title` and `Add Button`, so this title could be renamed to “Add new list”.

### Color and Contrast

If the application we are working on is based on Lexicon all components will be well contrasted. If it isn't (or even if it is), you can validate the contrast ratio with tools like [Webaim Contrast Checker](https://webaim.org/resources/contrastchecker/).

<div class="alert alert-info">
    <small>
        If you are using accessibility validator probably you will get errors about color contrast, it can be an error for a validator bug when bg color is transparent.
    </small>
</div>

</article>