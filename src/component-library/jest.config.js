/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    // if your using tsconfig.paths theres is no harm in telling jest
    '@components/(.*)$': '<rootDir>/components/$1',
    '@/(.*)$': '<rootDir>/$1',

    // mocking assets and styling
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.ts',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/mocks/styleMock.ts',
    /* mock models and services folder */
    '(models|services)': '<rootDir>/mocks/fileMock.ts',
    /* mock svg as svgr React import */
    '\\.svg$': '<rootDir>/mocks/svg.tsx',
  },
  // to obtain access to the matchers.
  setupFilesAfterEnv: ['./setupTests.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/(core-components|components|foundation|scaffold|consultant-finder|careers)/**/*.spec.(tsx|ts)',
  ],
};
