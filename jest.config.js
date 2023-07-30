//https://nextjs.org/docs/pages/building-your-application/optimizing/testing#setting-up-jest-with-the-rust-compiler
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/test/', './src/'],
  testEnvironment: 'jest-environment-jsdom',
  //preset: "ts-jest"
}

module.exports = createJestConfig(config)