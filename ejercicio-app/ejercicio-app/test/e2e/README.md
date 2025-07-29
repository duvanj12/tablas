# What's this project about?

This project aims to be a set of E2E functional tests that go along with the application scaffold, as well as a starting point/boilerplate for your requirements and custom use cases, and a quick guide about how to write functional tests for your Cells Applications.

## What is it made of?

- [Cells Pepino V2](https://platform.bbva.com/en-us/developers/engines/cells/documentation/testing/cells-pepino-v2), a lightweight test runner based on top of WebdriverIO 6, CucumberJS as testing framework, and Selenium/Appium as browser/mobile automation tools.

- [Global E2E Testing Framework for javascript](https://globaldevtools.bbva.com/bitbucket/projects/BGT/repos/e2e-js-framework/browse), a set of tools for developing e2e tests with javascript. It provides well known, battle tested, tools and patterns so you can start coding with zero effort e2e tests.

For more information about these products, how do they works, etc..., please, check the associated links.

# Usage

First of all, you need to install E2E project dependencies - remember to be inside e2e folder!

```bash
npm i
```

After all dependencies are installed, you only need to execute the test runner - remember to be inside e2e folder!

```shell
./node_modules/@cells-pepino/cli/bin/cli.js -c ./config/browser.js
```

Or use the already added npm script shortcut:

```bash
npm run test
```

# Configuration files

We've provided a few different sample configuration files for browsers, emulators (iOS, Android), and vBank usage. If you need to customize them more in deep, you can check different configuration files inside [Global E2E Testing Framework for javascript](https://globaldevtools.bbva.com/bitbucket/projects/BGT/repos/e2e-js-framework/browse/packages/generator-testing-wdio-ts/generators/app/templates/_v5/config), and take advantage of all the configuration that [WebdriverIO5](https://v5.webdriver.io/docs/options.html) provides for you.

You should be aware that, if you are running your tests _locally_ against `Sauce Labs` [it's highly recommended to use a locally defined domain rather than localhost due to Sauce Labs internal behavior](https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy+FAQs#SauceConnectProxyFAQs-CanIAccessApplicationsonlocalhost?). Using a locally defined domain name also allows access to applications on *any port*.

If that's the case, remember also to tweak your target `application configuration files` (in case you've defined an application configuration property with the host value of the target backend) or the application itself if they're hardcoded in it. It also applies in case you are using `vBank recordings` - otherwise, the web application (executed inside _Sauce Labs_ environment), is not going to be able to reach vBank server (_exposed locally_), and your tests will fail.

If you are running your tests on `CI (Jenkins)` environment, against `Sauce Labs`, and you are using `vBank`, we've already defined a domain that maps to _localhost_ for your ease: `cells.vbank.cicd.internal`. As stated in previous paragraph, you should update  your application configuration files according that domain, or create a new one for CI usage - otherwise, the web application (executed inside _Sauce Labs_ environment), is not going to be able to reach vBank server (_exposed in CI (Jenkins) environment_), and your tests will fail.

# CI (Jenkins)

You can run your E2E tests in CI, with only extending your current jenkinsfile with the following configuration.

__Remember to configure it properly upon to your needs: (buildConfigs, and e2eTests block).__

```groovy
...
entrypointParams = [
        type            : "cellsApp",
        buildConfigs    : [
                config1:    [config:'dev', build:'vulcanize', e2econfig: ['pepino']] // Your build requirements.
        ],
        deployS3        : true,
        e2eTests        : [
                pepino: [
                        e2econfig: ["browser.js"], // Your custom config file for jenkins environment.
                        abortOnFailure: true,
                        isLocalTest: true,
                        baseFolder: "test/e2e",
                        testRunner: "pepino",
                ],
        ]
]
...
```