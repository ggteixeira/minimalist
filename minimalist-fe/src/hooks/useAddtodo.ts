import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const PATH = "https://localhost:7071/todo";

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
