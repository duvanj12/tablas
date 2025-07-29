require('global-agent/bootstrap');

const { configBuild } = require('@testing/wdio-config');
const { config } = require('./base.conf');
const { chrome } = require('./browser');

const { GRID_USER, GALATEA, HTTP_PROXY, http_proxy, GLOBAL_AGENT_HTTP_PROXY } =
  process.env

console.log(`[sauce labs] GRID_USER: ${GRID_USER} - GALATEA: ${GALATEA}`)
console.log(
  `[sauce labs] HTTP_PROXY: ${HTTP_PROXY} - http_proxy: ${http_proxy} - GLOBAL_AGENT_HTTP_PROXY: ${GLOBAL_AGENT_HTTP_PROXY}`
)

exports.config = configBuild(config, {
  capabilities: [chrome],
  sauceConnect: true,
  proxy: 'http://proxy.cloud.local:8080'
})