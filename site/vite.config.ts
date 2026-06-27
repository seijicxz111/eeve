import { resolve } from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: "site",
  resolve: {
    alias: {
      "eeve/styles.css": resolve(__dirname, "../src/styles/globals.css"),
      "eeve": resolve(__dirname, "../src/index.ts")
    }
  },
  build: {
    outDir: "../site-dist",
    emptyOutDir: true
  },
  server: {
    host: "127.0.0.1",
    port: 5173
  },
  preview: {
    host: "127.0.0.1",
    port: 4173
  }
});
