const defaultTheme = require('tailwindcss/defaultTheme');
const widthCalc = Array(4).fill(0).reduce((acc, v, idx) => {
  acc[(2 + idx) * 72 + ''] = (2 + idx) * 18 + 'rem'
  return acc
}, {})
module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          fontFamily: {
              sans: ['Nunito', ...defaultTheme.fontFamily.sans],
          },
          margin: {
            'xl': '25%',
          },
          height: theme => ({
            "screen-navbar": "calc(100vh - 64px)",
            "screen/2": "50vh",
            "screen/3": "calc(100vh / 3)",
            "screen/4": "calc(100vh / 4)",
            "screen/5": "calc(100vh / 5)",
            "fit-content": "fit-content"
          }),
          width: theme => ({
            "screen/2": "50vw",
            "screen/3": "calc(100vw / 3)",
            "screen/4": "calc(100vw / 4)",
            "screen/5": "calc(100vw / 5)",
            "screen/6": "calc(100vw / 6)",
            "screen/8": "calc(100vw / 8)",
            "screen/10": "calc(100vw / 10)",
            "fit-content": "fit-content",
            "192": "48rem",
            ...widthCalc
          }),
          minHeight: theme => ({
            "screen-navbar": "calc(100vh - 64px)",
          }),
          maxHeight: theme => ({
            '0': '0',
            '1/4': '25vh',
            '1/2': '50vh',
            '3/4': '75vh',
            'full': '100vh',
          }),
          maxWidth: theme => ({
            '0': '0',
            '1/4': '25vw',
            '1/2': '50vw',
            '3/4': '75vw',
            'full': '100vw',
          })
      },
  },
  plugins: [require('@tailwindcss/typography')],
}
