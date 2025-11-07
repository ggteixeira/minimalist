import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const PATH = "https://localhost:7071/todo";

/**
 * @deprecated Use `useDeleteTodoId` instead.
 * This hook will be removed in a future release.
 */

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId }: { todoId: number }) => {
      return axios.delete(`${PATH}/${todoId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
