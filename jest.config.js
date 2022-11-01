module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.[jt]s?(x)'],
  verbose: true,
  testTimeout: 30000,
  reporters: [
    'default',
    [
      'jest-junit',
      { outputDirectory: 'output/report_xml', outputName: 'report.xml' }
    ],
    [
      'jest-html-reporters',
      {
        publicPath: './output',
        filename: 'index.html',
        pageTitle: 'Test the dog api',
        expand: false,
        openReport: false
      }
    ]
  ]
};
