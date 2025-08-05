import axios from "axios";

const PATH = "https://localhost:7071/todo";

export const addTodo = async () => {
  const response = await axios.post(PATH);
  return response.data;
};
