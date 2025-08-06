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
  safelist: [
    // Text colors
    "text-success",
    "text-danger",
    "text-warning",
    "text-black",
    "text-primary",
    "text-neutral-50",
    "text-neutral-950",
    "text-gray-800",
    "text-gray-900",
    "text-gray-500",
    "text-danger",

    // background colors
    "bg-danger_light",
    "bg-success-light",
    "bg-warning-light",
    "bg-primary",
    "bg-button",
    "bg-gray-200",
    "bg-primary_light",
    "bg-neutral-800",
    "bg-neutral-100",
    "bg-primary_light",
    "bg-white",

    // borders
    "border-neutral-200",
    "border-neutral-800",
    "bg-neutral-950",

    // Hover states
    "group-hover:text-gray-900",
    "group-hover:bg-primary_light",
    "group-hover:text-primary",
  ],
  plugins: [],
};
