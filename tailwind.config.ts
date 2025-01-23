import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: 'var(--primaryColor)',
        secondaryColor: 'var(--secondaryColor)',
        // gray
        grey: 'var(--grey)',
        grey10: 'var(--grey10)',
        grey20: 'var(--grey20)',
        grey40: 'var(--grey40)',
        grey80: 'var(--grey80)',
        // blue
        blue80: 'var(--blue80)',
        blue60: 'var(--blue60)',
        // green
        green80: 'var(--green80)',
        green60: 'var(--green60)',
        green20: 'var(--green20)',
        // red
        red80: 'var(--red80)',
        error: 'var(--error)',
        // other
        success: 'var(--success)'
      },
      spacing: {
        '2xs': '0.125rem',
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      borderRadius: {
        '2xs': '0.125rem',
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        '4xl': '2rem',
        '5xl': '2.5rem'
      }
    }
  },
  plugins: []
} satisfies Config;
