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
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
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
        'fontSize-6': 'var(--fontSize-6)'
      }
    },
    screens: {
      'phone': {'max': '480px'}
    }
  },
  plugins: [],
}

