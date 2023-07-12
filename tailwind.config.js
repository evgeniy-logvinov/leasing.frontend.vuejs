/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: '320px',
      xs: '480px',
      sm: '640px',
      md: '980px',
      // md: '768px',
      lg: '1200px'
      // lg: '1024px',
      // xl: '1280px',
      // '2xl': '1536'
    }

    // 320, 480, 640, 980, 1200
  },
  plugins: []
}
