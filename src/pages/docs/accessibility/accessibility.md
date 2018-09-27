---
title: Accessibility
description: ""
layout: "guide"
weight: 200
clayTaglib: "Accessibility"
---

# Main Accessibility tips for liferay portal:

<article id="accessibility">

Remember, more common disability is a cognitive disability and it requires from our developments to clear and direct messages to improve the understanding. Our interface will be designed by UX designers to be clear but we need to make sure the interface can be read clearly out of context, we must try to have this idea in mind during our accessibility reviews.

## Check your correct keyboard navigation:

- All links and buttons should be accessible by keyboard.
- Avoid keyboard traps (keyboard tab loops).
- Control the lineal focus direction, it must follow a correct visual and logic order.
- Create keyboard widget if the component is complex, for example; a table with order/actions/filters.

## Check the semantic

All visual content in interfaces needs text title or description.
A simple button / link can be confusing, try to be sure your button make clear what it does, for example, an icon button must have description text with using the class .sr-only (screen reader only).
Use CSS/HTML validators, tools like [Axe accessibility](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd) bar can help you a lot.

## Use screen readers

There are a lot of different screen readers, offered by OS, browser, from open source and paid apps but mainly there are two ways to read screen content: by a touchable device or a regular tabulation.

Touchable screens readers can be tested with iOS or Android activating its accessibility readers, in case of you use iOS the screen reader is [VoiceOver](https://www.apple.com/voiceover/info/guide/_1124.html) and it has a similar behaviour than Mac version.

To test in desktop he can use native OS screen reader and browser plugin like [ChromeVox](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=es-419).

We need to determine if buttons, links, titles and rest of meaning items have sense in a set or individually. For example:

<img class="img img-thumbnail" src="/images/lexiconMigration/accessibility_example.png">

Visually this title “Add” could has sense in the group of “Dynamic Data Lists” but in a linear reading we have a dropdown, a navigation and all options of management bar between Title and Add Button, so this title should be renamed to “Add new list”.

## Color and Contrast

If the application we are working on is based on Lexicon all components will be well contrasted, if your application is not based on Lexicon you can validate the contrast ratio with tools like [Webaim Contrast Checker](https://webaim.org/resources/contrastchecker/).
If you are using accessibility validator probably you will get errors about color contrast, it can be an error for a validator bug when bg color is transparent.


</article>
