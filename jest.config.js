module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'api/**/*.js',
    '!api/test/**',
    '!api/migrations/**',
    '!api/seeders/**'
  ],
  testMatch: [
    '**/test/**/*.test.js'
  ]
}
