module.exports = {
  verbose: true,
  clearMocks: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/enzyme.config.js/**',
    '!**/jest.config.js/**',
    '!**/webpack.config.js/**',
    '!**/.eslintrc.js/**',
    '!**/client/src/dist/bundle.js/**',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  testURL: 'http://localhost',
  setupFilesAfterEnv: ['<rootDir>/enzyme.config.js'],
};
