/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        whitesmoke: "whitesmoke",
        grey: "grey",
        lightgrey: "lightgrey",
        lightblue: "lightblue",
        blue: "blue",
        red: "red",
      },
    },
  },
  /* remove Tailwind CSS reset */
  // corePlugins: {
  //   preflight: false,
  // },
};
