import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
      },
        backgroundImage: {
      'hero-pattern': "url('/assets/hero-bg.jpg')",
    },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
