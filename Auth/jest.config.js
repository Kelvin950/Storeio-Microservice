
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "./test/globalSetup.ts",
  "globalTeardown": "./test/globalTeardown.ts",
  setupFilesAfterEnv:["./test/setup.ts"]
 
};