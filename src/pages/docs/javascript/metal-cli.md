---
title: Metal-cli
description: ""
layout: "guide"
weight: 200
clayTaglib: "Liferay NPM Bundler"
---

<article id="how-to-migrate">

### How to migrate your OSGi module from  liferay-module-config-generator and metal-cli to liferay-npm-bundler

This document describes the steps required to use
the [liferay-npm-bundler](https://github.com/liferay/liferay-npm-build-tools/tree/master/packages/liferay-npm-bundler) in your OSGi module in [liferay-portal](https://github.com/liferay/liferay-portal).

Before going on, we strongly recommend reading [liferay-npm-bundler's wiki](https://github.com/liferay/liferay-npm-build-tools/wiki/How-to-use-liferay-npm-bundler) to have more information about the bundler as well as understanding what it is used for.

If you previously used the [liferay-module-config-generator](https://github.com/liferay/liferay-module-config-generator) and [metal-cli](https://github.com/metal/metal-cli) tools, you will have to apply some changes to your build process.

# Introduction

When using **liferay-module-config-generator** and **metal-cli** some build tasks were done automatically, with the new **liferay-npm-bundler** you will have to do this manually, but we beleive that having more control of what goes in your OSGi bundle is better.

## Bundling your frontend code

By default, when running the `gradlew build` or `gradlew deploy` commands to build or deploy your OSGi module, if a `build` script is defined in your `package.json`'s `scripts` section, if will be executed.

This `build` script can do whatever you want it to; like transpiling JavaScript, transpiling sass files or anything else you define.

If you're using `babel` to transpile your JavaScript and need a specific configuration for your application, you can add a `.babelrc` configuration file.

Here's an example of a basic configuration using the `env` preset.

```json
{
  "presets": ["env"]
}
```

You'll also need to specify the required dependencies in your `package.json` file.

> Note: you might need more dependencies, but here we're just showing the ones used for this example.

```json
{
  "devDependencies": {
    "babel-cli": "6.26.0",
    "babel-preset-env": "^1.6.1",
    "cross-env": "^5.1.3",
    "liferay-npm-bundler": "^2.1.0",
    "metal-tools-soy": "^6.0.0",
    "rimraf": "^2.6.2"
  }
}
```
> **Important**: If you're migrating an existing project make sure to remove the  `liferay-module-config-generator` and `metal-cli` dependencies in `devDependencies` listed in your `package.json` file.

You'll also need to define the required `scripts` to build you JavaScript related code.

In this example, we have defined a `build` script that will compile our `.soy` templates to JavaScript files and will transpile our ES6 JavaScript to ES5, additionally we're deleting the generated `.soy.js` files.

> Note: you might have defined more scripts, but here we're just showing the ones used for this example.

```json
{
  "scripts": {
    "build": "metalsoy --soyDeps \"node_modules/+(clay-button|clay-icon|com.liferay.frontend.js.web)/**/*.soy\" && cross-env NODE_ENV=production babel --source-maps -d classes/META-INF/resources src/main/resources/META-INF/resources && liferay-npm-bundler && npm run cleanSoy",
    "cleanSoy": "rimraf src/**/*.soy.js"
  }
}
```

If you've developed JavaScript applications in liferay-portal, you might be wondering why we're passing `com.liferay.frontend.js.web` to the `metalsoy` command in our `build` scipt. The reason for this is that by not using **metal-cli** you can no longer use the `soyCompile` task in your `build.gradle` file.

Instead, you have to use the `jsCompile` task in your `build.gradle` file to copy the required `.soy` files in a directory the build process is able to access, these files will actually be copied to the `node_modules` directory in the root of your OSGi module's directory.

Since they are copied to that location, **metalsoy** will be able to access them.

Apply these changes in your `build.gradle` file:

```groovy
dependencies {
  // If you previously used the `soyCompile` task, you now
  // need to use the `jsCompile` task

  // For example, if you had this:
  // soyCompile project(":apps:frontend-js:frontend-js-web")

  // You now need to use this:
  jsCompile project(":apps:frontend-js:frontend-js-web")
}
```

Now that mostly everything is configured to bundle your OSGi module, you can deploy your OSGi module by issuing the following command in the root directory of your OSGi module:

```shell
gradlew deploy
```

## Configuring liferay-npm-bundler

If you want to configure **liferay-npm-bundler**, you can do so by creating a file named `.npmbundlerrc`.
This allows you to specify which imports you'd like to use, the files you'd like to exclude or the output directory of your "bundled" application among other things.

> *Be sure to check [liferay-npm-bundler's wiki](https://github.com/liferay/liferay-npm-build-tools/wiki/How-to-use-liferay-npm-bundler) for more information.*

The most "basic" configuration looks like this

```json
{
  "output": "classes/META-INF/resources/"
}
```

Meaning that we want our `node_modules` directory to be placed in the  `classes/META-INF/resources/` directory.

If you don't want to figure out which imports you should be using, you can use the `preset` option.

We have developed a _preset_ contaning **all** of the exported packages in _liferay-portal_.

To use it, you just need to specify it in your .npmbundlerrc file like this

```json
{
  "output": "classes/META-INF/resources/",
  "preset": "liferay-npm-bundler-preset-portal"
}
```

## Specifying imports

**liferay-npm-bundler** introduces the concept of **imports**.

While the **dependencies** declared in your **package.json** file are copied to the output directory of your bundle (which is usually the  `classes/META-INF/resources/node_modules` directory) - **imports** are a different concept.

You can use the **imports** feature to exclude certain dependencies from your bundle: if a dependency is declared in your **package.json** and you also specify it in the **imports** section of your .npmbundlerrc file, it will be excluded.

For example, if your package.json file declares the following dependecy

```json
{
  "dependencies": {
    "metal": "^2.16.0"
  }
}
```

And your **.npmbundlerrc** file declares the following imports:

```json
{
  "config": {
    "imports": {
      "frontend-js-metal-web": {
        "metal": ">=2.16.5"
      }
    }
  }
}
```

The bundler will "use" the *metal* package from the *frontend-js-metal-web* module.
This way you can re-use dependencies accross various OSGi modules, and at the same time optimize the bundling process.

Once everything is configured, you can deploy your OSGi module as you would normally do with the following command:

```shell
gradlew deploy
```
</article>