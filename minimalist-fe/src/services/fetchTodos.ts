import axios from "axios";

export const fetchTodos = async () => {
  const PATH = "https://localhost:7071/todo";

  const response = await axios.get(PATH);
  return response.data;
};
