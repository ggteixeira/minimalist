import "../App.css";
import type { TodoInterface } from "../types/TodoInterface";
import { useTodos } from "../hooks/useTodos";
import { useToggleTodo } from "../hooks/useToggleTodo";
import { EditOutlined } from "@mui/icons-material";

const TodoItem = ({
  todo,
  handleToggleTodo,
  deleteTodo,
}: {
  todo: TodoInterface;
  handleToggleTodo: (todo: TodoInterface) => void;
  deleteTodo: (id: number) => void;
}) => {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBlock: "0.5rem",
        border: "1px solid gray",
        padding: "0.25rem",
      }}
    >
      <span
        style={{
          textDecoration: todo.isCompleted ? "line-through" : "none",
          color: todo.isCompleted ? "gray" : "black",
          cursor: "pointer",
        }}
        onClick={() => handleToggleTodo(todo)}
      >
        {todo.title}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <EditOutlined
          sx={{ color: "gray", "&:hover": { cursor: "pointer" } }}
        />
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </li>
  );
};

const ListOfTodos = ({ deleteTodo }: { deleteTodo: (id: number) => void }) => {
  const { isPending, error, data: todoData } = useTodos();

  const toggleTodoMutation = useToggleTodo();

  const handleToggleTodo = (todo: TodoInterface) => {
    const body = [
      {
        op: "replace",
        path: "/iscompleted",
        value: !todo.isCompleted,
      },
    ];

    toggleTodoMutation.mutate({ todo, body });
  };

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>An error has occurred</span>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todoData.map((todo: TodoInterface) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleToggleTodo={handleToggleTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </ul>
  );
};

export default ListOfTodos;
