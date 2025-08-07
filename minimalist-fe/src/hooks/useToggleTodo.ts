import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TodoInterface } from "../types/TodoInterface";
import axios from "axios";

const PATH = "https://localhost:7071/todo";

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todo }: { todo: TodoInterface }) => {
      const patchBody = [
        {
          op: "replace",
          path: "/iscompleted",
          value: !todo.isCompleted,
        },
      ];

      return axios.patch(`${PATH}/${todo.id}/complete`, patchBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
