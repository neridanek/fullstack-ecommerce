module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
};
