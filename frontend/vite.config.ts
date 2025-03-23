import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@api": path.resolve(__dirname, "../api"),
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
     // Add this line to allow the host
  },
});
