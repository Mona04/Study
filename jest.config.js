//https://nextjs.org/docs/pages/building-your-application/optimizing/testing#setting-up-jest-with-the-rust-compiler

const nextJest = require('next/jest');
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
const config = (async () => {
  const a = await  createJestConfig()();

  // contentlayer 가 es6 이라서 transform 을 시켜줘야함
  a.transformIgnorePatterns = [
    '/node_modules/(?!(contentlayer|@contentlayer))',
    '^.+\\.module\\.(css|sass|scss)$',
  ];
  return a;
});

module.exports = config;