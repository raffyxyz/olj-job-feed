// jest.setup.ts
import '@testing-library/jest-dom'  // extends expect with e.g. .toBeInTheDocument()

// If you need to load environment variables like Next.js does:
import { loadEnvConfig } from '@next/env'
const projectDir = process.cwd()
loadEnvConfig(projectDir)  // so that .env.test / .env etc get loaded the same way Next does
