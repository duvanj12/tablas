require('global-agent/bootstrap');
const { configBuild } = require('@testing/wdio-config');
const { config } = require('./base.conf');
const { chrome } = require('./browser');

const { GRID_USER, GRID_PASS, GRID_TUNNEL, GALATEA } = process.env;

console.log(`[Galatea] GRID_USER: ${GRID_USER} - GALATEA: ${GALATEA}`)
console.log(
  `[Galatea] GRID_TUNNEL: ${GRID_TUNNEL}`
)

exports.config = configBuild(config, {
  capabilities: [chrome],
  galateaTunnel: GRID_TUNNEL === 'true',
  galateaTunnelOpts: {
    server: 'https://galatea.globaldevtools.bbva.com/api/v0/tunnels',
    user: GRID_USER,
    key: GRID_PASS,
    logFile: 'results/galatea-tunnel.log',
    proxy: 'http://proxy.cloud.local:8080'
  }
})