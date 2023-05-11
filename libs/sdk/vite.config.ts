import { defineConfig } from "vite";
import path from "path";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      undetch: path.join(__dirname, "node_modules/unfetch/dist/unfetch.js"),
    },
  },
  plugins: [preact()],
});
