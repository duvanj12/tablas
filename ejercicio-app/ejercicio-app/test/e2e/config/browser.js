const {configBuild} = require("@testing/wdio-config");
const {config} = require("./base.conf");

const chrome = exports.chrome = {
    browserName: 'chrome',
    'goog:chromeOptions': {
        args: [
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--headless',
            '--window-size=1366,1068'
        ]
    }
};
const firefox = exports.firefox = {browserName: 'firefox'};
const edge = exports.edge = {browserName: 'MicrosoftEdge'};
const safari = exports.safari = {browserName: 'safari'};

const all = exports.all = [chrome];

exports.config = configBuild(config, {
    capabilities: all,
});