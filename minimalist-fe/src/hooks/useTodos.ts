import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../services/fetchTodos";

// React-query hook
export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};
