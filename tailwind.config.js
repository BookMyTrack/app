/** eslint-disable */
const tc = require("tailwind-radix-colors");
const theme = require("tailwindcss/defaultTheme");

/** eslint-enable */

const palette = {
  ...tc.createAlias('primary', 'amber'),
  ...tc.createAlias('neutral', 'mauve'),
  ...tc.createAlias('danger', 'red'),
  ...tc.createAlias('success', 'green'),
}



/**
 * @type { import('tailwindcss/tailwind-config').TailwindConfig }
 */
const config = {
  content: ["./app/components/**/*.{ts,tsx}", "./app/routes/**/*.{ts,tsx}", "./app/root.tsx"],
  darkMode: 'class',
  theme: {
    colors: {
      ...theme.colors,

      white: '#fff',
      black: '#000',
      transparent: 'rgba(0,0,0,0)',

      ...tc.colors,
      ...palette
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...theme.fontFamily.sans],
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          }
        }
      }
    },
  },
  plugins: [
    tc.plugin({
      debug: true,
      properties: ["bg", "placeholder", "divide", "shadow", "text", "border", "ring"],
      colors: {
        ...tc.colors,
        ...palette,
      }
    }),
    require("tailwindcss-radix"),
    require("@tailwindcss/forms"),
  ],
};

module.exports = config
