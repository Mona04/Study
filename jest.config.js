//https://nextjs.org/docs/pages/building-your-application/optimizing/testing#setting-up-jest-with-the-rust-compiler
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', './src/'],
  testEnvironment: 'node',
  preset: "ts-jest",
  transformIgnorePatterns: [
    'node_modules/(?!(contentlayer))', 

  ],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    '.contentlayer\\.+\\.js?$': 'ts-jest',
    'node_modules/contentlayer': 'ts-jest',
    'C:\\Users\\user\\Desktop\\Study\\blogs\\study-log\\node_modules\\contentlayer\\dist\\client\\index.js': "babel-jest"
  },

  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    //"contentlayer": require.resolve('contentlayer'),
   
  }
}

module.exports = createJestConfig(config)