module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  coverageReporters: ['json-summary'],
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.[jt]sx?$': 'babel-jest',
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-leaflet|@react-leaflet|d3-*|axios))',
  ],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    '^axios$': require.resolve('axios'),
    '\\.scss$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
