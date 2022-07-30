import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfig from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [react(), tsconfig()],
	define: {
		'import.meta.vitest': undefined,
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './setup-vitest.ts'
	}
})
