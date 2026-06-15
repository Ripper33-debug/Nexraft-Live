import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: [
      // server-only throws outside React Server Components; stub it for unit tests.
      { find: "server-only", replacement: `${root}tests/stubs/server-only.ts` },
      { find: /^@\//, replacement: root },
    ],
  },
});
