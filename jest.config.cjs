const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;
module.exports = {
  testMatch: ["**/src/__tests__/*.e2e.test.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
};

/** @type {import("jest").Config} **/
// module.exports = {
//   testEnvironment: "node",
//   extensionsToTreatAsEsm: [".ts"],
//   preset: "ts-jest/presets/default-esm",
//   transform: {
//     ...tsJestTransformCfg,
//   },
//   moduleNameMapper: {
//     "^(\\.{1,2}/.*)\\.js$": "$1",
//   },
//   globals: {
//     "ts-jest": {
//       useESM: true,
//     },
//   },
// };
