
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['scripts/**/*.ts'],
  outDir: 'dist/scripts',
  format: ['cjs'],
  splitting: false,
  clean: false,
  sourcemap: true,
  dts: false,
  target: 'es2020',
})
