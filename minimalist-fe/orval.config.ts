import { defineConfig } from "orval";

export default defineConfig({
  api: {
    output: {
      mode: "tags-split",
      target: "src/http/generated/api.ts",
      client: "react-query",
      httpClient: "fetch",
      clean: true,
      override: {
        mutator: {
          path: "src/http/adapters/api-client-adapter.ts",
          name: "apiClientAdapter",
        },
        query: {
          // useQuery: true, // TODO: descobre o que isso faz
          useInvalidate: true,
          // queryOptions: {
          //   path: "src/lib/react-query.ts",
          //   name: "queryOptionsFn",
          // },
        },
      },
    },

    hooks: {
      afterAllFilesWrite: "eslint --fix",
    },

    input: {
      target: "./swagger.json",
      // target: "7071/swagger/v1/swagger.json",
    },
  },
});
