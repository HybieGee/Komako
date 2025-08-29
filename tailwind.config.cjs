/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'Poppins', 'system-ui', 'sans-serif'],
        serif: ['Crimson Text', 'Georgia', 'serif'],
        kawaii: ['Comfortaa', 'Nunito', 'sans-serif'],
      },
      colors: {
        // Komako's cream/beige color palette
        komako: {
          cream: '#F7F3E9',
          light: '#F0EAD6',
          fur: '#E8DCC0',
          warm: '#DDD1B0',
          cozy: '#D4C4A0',
          soft: '#C9B583',
          nose: '#F8BBD9',
          blush: '#F4A2C6',
          eyes: '#8B4513',
        },
        primary: {
          50: '#FDF8F3',
          100: '#F7F3E9',
          200: '#F0EAD6',
          300: '#E8DCC0',
          400: '#DDD1B0',
          500: '#D4C4A0',
          600: '#C9B583',
          700: '#B8A374',
          800: '#9D8960',
          900: '#7D6B4A',
        },
        accent: {
          pink: '#F8BBD9',
          rose: '#F4A2C6',
          peach: '#FDD5B8',
          cream: '#FFF8F0',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            h1: { color: theme('colors.gray.100') },
            h2: { color: theme('colors.gray.100') },
            h3: { color: theme('colors.gray.100') },
            h4: { color: theme('colors.gray.100') },
            strong: { color: theme('colors.gray.100') },
            blockquote: { color: theme('colors.gray.300') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};