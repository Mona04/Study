//https://nextjs.org/docs/pages/building-your-application/optimizing/testing#setting-up-jest-with-the-rust-compiler

const nextJest = require('next/jest');
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config = (async () => {
  /**
   * createJestConfig() 에서 생성한걸 하드코딩해서 사용하려면 몇가지 수정을 해야한다.
   * 1. tsconfig.json 등에서 compilerOptions.baseUrl 를 moduleDirectories 에 추가한다.
   * 2. compilerOptions.paths 를 moduleNameMapper 에 추가한다.
   * 왜 createJestConfig() 를 사용하면 이 작업이 필요없는지는 모르겠다.
   */
  const a = await createJestConfig()();

  // contentlayer 가 es6 이라서 transform 을 시켜줘야함
  a.transformIgnorePatterns = [
    '/node_modules/(?!(contentlayer|@contentlayer))',
    '^.+\\.module\\.(css|sass|scss)$',
  ];
  console.log(a);
  return a;
});

module.exports = config;