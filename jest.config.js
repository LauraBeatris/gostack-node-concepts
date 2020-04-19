module.exports = {
  // TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.
  preset: 'ts-jest',

  testTimeout: 500,

  // The test environment that will be used for testing
  testEnvironment: "node",

  // Automatically clear mock calls and instances between every test
  clearMocks: true
};


