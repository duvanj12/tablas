const configBase = require('./base.conf');
const recording = process.env.VBANK_RECORDING || false;

if(recording) {
  process.env.DATAMANAGER_BASE_URL = 'http://localhost:5002/data-manager-api/namespaces/cells-e2e-boilerplate-acis';
}

exports.config = {
  ...configBase.config,
  vbank: {
    timeout: 100 * 1000,
    verbose: true,
    workspace: 'vbank/records',
    backends: [{
        name: 'mock',
        realUrl: recording &&  'http://localhost:3000',
        port: '7071'
      },
      {
        name: 'datamanager',
        realUrl: recording && 'https://globaldevtools.bbva.com',
        port: '5002'
      }
    ],
    recording,
    parallel: false
  },
};