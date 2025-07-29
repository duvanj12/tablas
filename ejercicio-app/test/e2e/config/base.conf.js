// bot-cells-e2e-boilerplate-acis with access to cells-e2e-boilerplate-acis Data Manager namespace
process.env.DATAMANAGER_HEADERS = '{"Authorization": "Ym90LWNlbGxzLWUyZS1ib2lsZXJwbGF0ZS1hY2lzOlZUaU5LdVBnVzk5dFNYTGtKSmFMMDludmEzZFd6dUVGNEJ2TGlUcU0="}';
process.env.DATAMANAGER_BASE_URL = 'https://globaldevtools.bbva.com/data-manager-api/namespaces/cells-e2e-boilerplate-acis';

// See extensive list of available options: https://webdriver.io/docs/configurationfile.html
exports.config = {
  baseUrl: 'http://localhost:8001/index.html',
  cucumberOpts: {
    require: [
      './src/**/hooks/*.ts',
      './src/**/steps/*.ts'
    ],
  }
};