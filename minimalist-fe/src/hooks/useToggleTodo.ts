import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TodoInterface } from "../types/TodoInterface";
import type { BodyInterface } from "../types/BodyInterface";
import axios from "axios";

const PATH = "https://localhost:7071/todo";

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      todo,
      body,
    }: {
      todo: TodoInterface;
      body: BodyInterface[];
    }) => {
      return axios.patch(`${PATH}/${todo.id}/complete`, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
