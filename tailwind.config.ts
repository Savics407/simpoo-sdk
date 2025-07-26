/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // ✅ Include SDK source
  theme: {
    extend: {
      colors: {
        primary: "#1868DB",
        "primary-200": "#32ADE6",
        primary_light: "#E7F1FF",
        red_light: "#FDEDF0",
        button: "#1353af",
        danger: "#F1416C",
        danger_light: "#FFF5F8",
        success: "#50CD89",
        warning: "#F6C000",
        orange: "#ED7400",
        "orange-light": "#FFF8DD",
        "warning-light": "#FFF8DD",
        muted: "#525866",
        "success-light": "#E8FFF3",
        "gray-100": "#F9F9F9",
        "gray-200": "#F1F1F2",
        "gray-300": "#E1E3EA",
        "gray-400": "#D8D8E5",
        "gray-500": "#202125",
        "gray-700": "#5E6278",
        "gray-800": "#3F4254",
        "gray-900": "#181C32",
        dark: "#181C32",
        info: "#7239EA",
      },
    },
  },
  plugins: [],
};
