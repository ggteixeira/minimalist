import axios from "axios";

export const deleteTodoById = async (id: number) => {
  const response = await axios.delete(`https://localhost:7071/todo/${id}`);
  return response.data;
};
