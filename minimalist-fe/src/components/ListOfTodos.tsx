import "../App.css";
import type { TodoInterface } from "../types/TodoInterface";
import { useTodos } from "../hooks/useTodos";
import { useToggleTodo } from "../hooks/useToggleTodo";

const ListOfTodos = ({ deleteTodo }: { deleteTodo: (id: number) => void }) => {
  const { isPending, error, data: todoData } = useTodos();

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
