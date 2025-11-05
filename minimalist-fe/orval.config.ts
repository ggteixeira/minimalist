import { defineConfig } from "orval";

export default defineConfig({
  api: {
    output: {
      // mode: "tags",
      target: "src/http/generated/api.ts",
      // schemas: "src/todosAPIModel",
      client: "react-query",
      httpClient: "fetch",
      clean: true,
      override: {
        mutator: {
          path: "src/http/adapters/api-client-adapter.ts",
          name: "apiClientAdapter",
        },
      },
    },

    hooks: {
      afterAllFilesWrite: "eslint --fix",
    },

    input: {
      target: "./swagger.json",
      // target: "https://localhost:7071/swagger/v1/swagger.json",
    },
  },
});
