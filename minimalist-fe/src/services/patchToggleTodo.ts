import axios from "axios";

export const toggleTodo = (id: number, isCompleted: boolean) => {
  const PATH = "https://localhost:7071/todo";

  const response = axios.patch(`${PATH}/${id}/complete`, [
    {
      op: "replace",
      path: "/iscompleted",
      value: isCompleted,
    },
  ]);

  return response.data;
};
