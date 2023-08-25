// https://tailwindcss.com/docs/configuration0
/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  darkMode: ['class', '[data-theme="dark"]'],
  content: ["./src/app/**/*.{jsx,tsx}"],
  theme: {
    fontFamily: {
      'sans': [
        'var(--fontFamily-sans)'
        //{
        //  fontFeatureSettings: '"cv11", "ss01"',
        //  fontVariationSettings: '"opsz" 32'
        //},
      ],
      'serif': ['Merriweather', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'mabi': ["mabinogi_classic"]
    },
    extend: {
      colors: {
        'color-primary'         : 'var(--color-primary)',
        'color-page-background' : 'var(--color-page-background)',
        'color-text'            : 'var(--color-text)',
        'color-text-light'      : 'var(--color-text-light)',
        'color-text-dimmed'     : 'var(--color-text-dimmed)',
      },
      spacing: {
        'nav-height': 'var(--nav-heigh)',
        'fontSize-6': 'var(--fontSize-6)'
      }
    },
  },
  plugins: [],
}

