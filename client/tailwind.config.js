/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6495ED',   // Example primary color
        secondary: '#F7DC6F', // Example secondary color
        accent: '#F7F7F7',    // Example accent color
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light"], // Ensure "light" theme is set
  },
}
