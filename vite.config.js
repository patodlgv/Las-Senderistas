import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5175,
    strictPort: true, // siempre 5175 (evita saltos de puerto que confunden la pestaña)
    open: false,
  },
  build: {
    // Compatibilidad amplia: transpila a Safari 12+ (todos los iPhones en uso).
    target: ["es2019", "safari12", "chrome70", "firefox68"],
  },
});
