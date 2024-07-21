import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom", // simulate the browser environment
    setupFiles: ["./vitest-setup.js"],
  },
});
