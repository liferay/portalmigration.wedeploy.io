---
title: Metal-cli
description: ""
layout: "guide"
weight: 200
clayTaglib: "Liferay NPM Bundler"
---

<article id="how-to-migrate">

### How to migrate your OSGi module from  liferay-module-config-generator and metal-cli to liferay-npm-scripts

This document describes the steps required to use
the [liferay-npm-scripts](https://github.com/bryceosterhaus/liferay-npm-tools/tree/master/packages/liferay-npm-scripts) in your OSGi module in [liferay-portal](https://github.com/liferay/liferay-portal).

Before going on, we strongly recommend reading [liferay-npm-scripts's README](https://github.com/bryceosterhaus/liferay-npm-tools/blob/master/packages/liferay-npm-scripts/README.md) to have more information about the scripts as well as understanding what they are used for.

If you previously used the [liferay-module-config-generator](https://github.com/liferay/liferay-module-config-generator) and [metal-cli](https://github.com/metal/metal-cli) tools, you will have to apply some changes to your build process.

# Introduction

When using **liferay-module-config-generator** and **metal-cli** some build tasks were done automatically, with the new **liferay-npm-scripts** you will have to do this manually, but we beleive that having more control of what goes in your OSGi bundle is better.

## Bundling your frontend code

By default, when running the `gradlew build` or `gradlew deploy` commands to build or deploy your OSGi module, if a `build` script is defined in your `package.json`'s `scripts` section, if will be executed.

This `build` script can do whatever you want it to; like transpiling JavaScript, transpiling sass files or anything else you define.

You'll also need to specify the required dependencies in your `package.json` file.

> Note: you might need more dependencies, but here we're just showing the ones used for this example.

```json
{
  "devDependencies": {
    "liferay-npm-scripts": "1.2.0"
  }
}
```
> **Important**: If you're migrating an existing project make sure to remove the  `liferay-module-config-generator` and `metal-cli` dependencies in `devDependencies` listed in your `package.json` file.


### A quick note about `config.js` files:

If the OSGi module you're migrating was previously using `metal-cli` and contains a `config.js` you should probably pay attention to this file:

This file might be used to configure AUI's loader or might be declaring AMD modules:

+ If it's related to AUI's loader you should probably ignore this file in your build script (i.e. skip transpiling)

+ If it's related to AMD you should remove it, but make sure that nothing is broken: you might have to republish old modules with the [liferay-bridge-generator](https://github.com/liferay/liferay-npm-build-tools/wiki/How-to-use-liferay-npm-bridge-generator), for example.

+ Finally, if it's related to both AUI loaded and AMD, you will have to split the file, leave the AUI part untouched and take care of adapting the AMD configuration.


You'll also need to define the required `scripts` to build you JavaScript related code.

In this example, we have defined a `build` script that will run the build script from **liferay-npm-scripts** that will transpile all javascript files with babel and then additionally it will compile our `.soy` templates by using the `--soy` flag and prepare dependencies for liferay-portal by using **liferay-npm-bundler** via the `--bundler` flag.

> Note: you might have defined more scripts, but here we're just showing the ones used for this example.

```json
{
  "scripts": {
    "build": "liferay-npm-scripts build --soy --bundler"
  }
}
```

If you have any soy dependencies for your application, you'll need to specify those in `build.gradle` and `.liferaynpmscriptsrc` files.

`build.gradle`
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

`.liferaynpmscriptsrc`
```json
{
	"build": {
		"dependencies": [
			"com.liferay.frontend.js.web"
		]
	}
}
```

`liferay-npm-scripts` will handle most of the default configuration to bundle your OSGi module's javascript, you can now deploy your OSGi module by issuing the following command in the root directory of your OSGi module:

```shell
gradlew deploy
```

## Configuring liferay-npm-scripts

If you want to further configure **liferay-npm-scripts** to further leverage the build process, please reference the [liferay-npm-scripts repo](https://github.com/bryceosterhaus/liferay-npm-tools/blob/master/packages/liferay-npm-scripts) itself for config information.

There are also other scripts available such as `test`, `lint`, `format`, and `eject`. You can learn more about these at the [liferay-npm-scripts repo](https://github.com/bryceosterhaus/liferay-npm-tools/blob/master/packages/liferay-npm-scripts).

Once everything is configured, you can deploy your OSGi module as you would normally do with the following command:

```shell
gradlew deploy
```
</article>