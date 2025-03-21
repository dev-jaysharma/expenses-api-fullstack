import { defineConfig } from "vite";
import path from "path"
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Ensure backend is running here
        changeOrigin: true,
        secure: false, // Add this if using HTTPS
      },
    },
  },
});
