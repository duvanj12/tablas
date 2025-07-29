const scanner = require('sonarqube-scanner');

const projectKeySuffix = (process.env.BRANCH_NAME) ? process.env.BRANCH_NAME :
                                                     process.env.SONAR_USER;
scanner(
    {
      serverUrl: 'https://globaldevtools.bbva.com/sonar',
      token: process.env.SONAR_API_KEY,
      options: {
        'sonar.sources': 'src',
        'sonar.projectKey': `BGT:cells-e2e-boilerplate:${projectKeySuffix}`,
        'sonar.projectBaseDir': '.',
        'sonar.analysis.mode': 'preview',
        'sonar.issuesReport.console.enable': 'true'
//      'sonar.issuesReport.html.enable': 'true',
        //      'sonar.test': 'test'
        //      'sonar.typescript.lcov.reportPaths':
        //      'reports/coverage/lcov.info',
        //      'sonar.testExecutionReportPaths': 'reports/test-report.xml'
      },
    },
    () => {
        // callback is required
    });
