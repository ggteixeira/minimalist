import { useQuery } from "@tanstack/react-query";

import axios from "axios";

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
