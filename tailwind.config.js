// https://tailwindcss.com/docs/configuration0
/** @type {import('tailwindcss').Config} */
const config = {
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
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3.0rem',
      '6xl': '3.75rem',
    },
    extend: {
      colors: {
        'color-primary'         : 'var(--color-primary)',
        'color-page-background' : 'var(--color-page-background)',
        'color-border'          : 'var(--color-border)',
        'color-text'            : 'var(--color-text)',
        'color-text-light'      : 'var(--color-text-light)',
        'color-text-dimmed'     : 'var(--color-text-dimmed)',
      },
      spacing: {
        'nav-height': 'var(--nav-height)',
      }
    },
    screens: {
      'desk': {'min': '640px'},
      'medium': {'min': '768px'},
    }
  },
  plugins: [],
}

export default config;