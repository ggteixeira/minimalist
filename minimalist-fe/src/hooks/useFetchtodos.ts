import { useQuery } from "@tanstack/react-query";

import axios from "axios";

/**
 * @deprecated Use `useGetTodo` instead.
 * This hook will be removed in a future release.
 */
const fetchTodos = async () => {
  const PATH = "https://localhost:7071/todo";

  const response = await axios.get(PATH);
  return response.data;
};

export const useFetchTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};
