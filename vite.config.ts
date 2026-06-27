import { resolve } from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    mode === "library"
      ? dts({
          entryRoot: "src",
          tsconfigPath: "./tsconfig.build.json",
          exclude: ["src/**/*.test.tsx", "src/**/*.stories.tsx", "tests"],
          bundleTypes: false
        })
      : null
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "EeveUiComponents",
      formats: ["es"],
      fileName: () => "index.js",
      cssFileName: "styles"
    },
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime"
        },
        preserveModules: false
      }
    }
  }
}));
