import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../services/fetchTodos";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};
