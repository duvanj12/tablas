const {configBuild} = require("@testing/wdio-config");
const {config} = require("./base.vbank.conf");

const chrome = exports.chrome = {browserName: 'chrome'};
const firefox = exports.firefox = {browserName: 'firefox'};
const edge = exports.edge = {browserName: 'MicrosoftEdge'};
const safari = exports.safari = {browserName: 'safari'};

const all = exports.all = [chrome, firefox, edge, safari];

exports.config = configBuild(config, {
    capabilities: all
});
