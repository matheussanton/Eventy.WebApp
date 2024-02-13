import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#1976d2',
        'accent-hover': '#007fff',
        'accent-disabled': '#b3d1ff',
        'light': '#f5f5f5',
        'dark': '#333333',
        'crimson': '#dc143c',
      },
      backgroundColor: {
        'accent': '#1976d2',
        'accent-hover': '#007fff',
        'accent-disabled': '#b3d1ff',
        'light': '#f5f5f5',
        'dark': '#333333',
        'crimson': '#dc143c',
      }
    },
  },
  plugins: [],
}
export default config
