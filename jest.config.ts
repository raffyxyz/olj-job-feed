// jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Point to your Next.js app directory so it can load next.config.js, .env, etc.
  dir: './',
})

const customConfig: Config = {
  // Use jsdom for DOM-related tests
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',

  // If you have setup scripts (e.g. to load env vars, global mocks)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // If you use path aliases (via tsconfig or jsconfig), mirror them here
  moduleNameMapper: {
    // For example: "@/utils/(.*)" => "<rootDir>/utils/$1"
    '^@/(.*)$': '<rootDir>/$1',
  },

  // Any other custom settings you want to add...
}

export default createJestConfig(customConfig)
