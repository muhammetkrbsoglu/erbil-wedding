/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Map semantic tokens to hex palette values (Pudra ve Şampanya)
        background: '#F5EBE0',
        foreground: '#312B27',
        card: {
          DEFAULT: '#D5B4A1',
          foreground: '#312B27',
        },
        popover: {
          DEFAULT: '#F5EBE0',
          foreground: '#312B27',
        },
        primary: {
          DEFAULT: '#F5EBE0',
          foreground: '#312B27',
        },
        secondary: {
          DEFAULT: '#D5B4A1',
          foreground: '#312B27',
        },
        accent: {
          DEFAULT: '#C08552',
          foreground: '#312B27',
        },
        neutral: '#4E443F',
        text: '#312B27',
        border: '#D5B4A1',
        input: '#FFFFFF',
  ring: '#C08552',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
