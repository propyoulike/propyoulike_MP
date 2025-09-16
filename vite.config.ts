import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // 👇 Deployment base path
  base: "/",

  // 👇 Dev server settings
  server: {
    host: "::",
    port: 8081,
    strictPort: true,
    open: "/",
  },

  // 👇 Plugins
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  // 👇 Path alias support
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // 👇 Build options (optional but recommended)
  build: {
    outDir: "dist",
    sourcemap: mode === "development",
  },
}));