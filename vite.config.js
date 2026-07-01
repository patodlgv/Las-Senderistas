import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5175,
    strictPort: true, // siempre 5175 (evita saltos de puerto que confunden la pestaña)
    open: false,
  },
  build: {
    target: "es2020",
  },
});
