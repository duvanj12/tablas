const {configBuild} = require("@testing/wdio-config");
const {config} = require("./base.conf");

const device = {
  platformName: "iOS",
  platformVersion: "13.2",
  'appium:deviceName': "iPhone XS Simulator",
  'appium:appiumVersion': "1.16.0",
  'appium:orientation': 'PORTRAIT',
};

exports.web = {
  ...device,
  browserName: "Safari",
};

exports.config = configBuild(config, {
  // DISCLAIMER: If you are running your tests again Sauce Labs and you are hosting your website in your local,
  // it's highly recommended to use a locally defined domain rather than localhost due to Sauce Labs internal behavior: 
  // https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy+FAQs#SauceConnectProxyFAQs-CanIAccessApplicationsonlocalhost?
  // Using a locally defined domain name also allows access to applications on any port.
  baseUrl: 'http://localhost:8001/index.html',
  capabilities: [exports.web]
}, process.env.GRID_USER ? {} : {
  port: 4723,
  services: ['appium']
});
