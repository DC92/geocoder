export default {
  setupFiles: ['<rootDir>/test/env-setup.cjs'],
  testRegex: '/test/unit/.*\\.test\\.js$',
  transformIgnorePatterns: ['/node_modules/(?!(ol)/)'],
};