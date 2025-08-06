import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { TodoInterface } from "../types/TodoInterface";

const PATH = "https://localhost:7071/todo";

export const useEditTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todo, body }: { body: string; todo: TodoInterface }) => {
      console.log("I am the mutation");
      console.log(todo);

      const patchBody = [
        {
          op: "replace",
          path: "/title",
          value: body,
        },
      ];

      return axios.patch(`${PATH}/${todo.id}`, patchBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
