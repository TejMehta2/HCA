/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    // if your using tsconfig.paths theres is no harm in telling jest
    "@components/(.*)$": "<rootDir>/components/$1",
    "@/(.*)$": "<rootDir>/$1",

    // mocking assets and styling
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/fileMock.ts",
    "^.+\\.(css|less|scss|sass)$": "<rootDir>/mocks/styleMock.ts",
    /* mock models and services folder */
    "(assets|models|services)": "<rootDir>/mocks/fileMock.ts",
  },
  // to obtain access to the matchers.
  setupFilesAfterEnv: ["./setupTests.ts"],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jsdom",
};
