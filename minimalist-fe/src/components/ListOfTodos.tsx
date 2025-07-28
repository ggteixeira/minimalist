import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "../App.css";
import type { TodoInterface } from "../types/TodoInterface";
import axios from "axios";

const ListOfTodos = ({ deleteTodo }: { deleteTodo: (id: number) => void }) => {
  const {
    isPending,
    error,
    data: todoData,
  } = useQuery({
    queryKey: ["todosData"],
    queryFn: async () => {
      const response = await fetch("https://localhost:7071/todo");
      return await response.json();
    },
  });

  const toggleTodo = (id: number, isCompleted: boolean) => {
    const response = axios.patch(`https://localhost:7071/todo/${id}/complete`, [
      {
        op: "replace",
        path: "/iscompleted",
        value: isCompleted,
      },
    ]);

    return response.data;
  };

  const useToggleTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, isCompleted }: TodoInterface) => {
        toggleTodo(id, isCompleted);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todosData"] });
      },
    });
  };

  const togleTodoHook = useToggleTodo();

  const handleToggleTodo = (todo: TodoInterface) => {
    togleTodoHook.mutate({ id: todo.id, isCompleted: !todo.isCompleted });
  };

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>An error has occurred</span>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todoData.map((todo: TodoInterface) => {
        return (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0.5rem",
            }}
          >
            <span
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => handleToggleTodo(todo)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default ListOfTodos;
