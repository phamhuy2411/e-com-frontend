/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.3)",
        right: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Màu chủ đạo - xanh dương
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Màu phụ - cam
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Màu thành công - xanh lá
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        background: {
          light: '#ffffff',
          DEFAULT: '#f8fafc',
          dark: '#f1f5f9',
        },
        text: {
          light: '#64748b',
          DEFAULT: '#334155',
          dark: '#1e293b',
        },
        customBlue: "rgba(28, 100, 242, 1)",
        banner: {
          color1: "#FDC200",
          color2: "#FF2C2C",
          color3: "#21AD61",
          color4: "#723DA6",
        },
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #111827, #1f2937)",
        "button-gradient": "linear-gradient(to right, #7e22ce, #ef4444)",
        "custom-gradient2": "linear-gradient(135deg, #f5f5f5, #eae7dc)",
      },
    },
  },
  plugins: [],
};
