import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const PATH = "https://localhost:7071/todo";

/**
 * @deprecated Use `usePostTodo` instead.
 * This hook will be removed in a future release.
 */

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ body }: { body: string }) => {
      return axios.post(PATH, { title: body });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
