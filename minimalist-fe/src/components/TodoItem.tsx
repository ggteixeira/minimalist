import { EditOutlined } from "@mui/icons-material";
import { useState } from "react";
import "../App.css";
import { useDeleteTodo } from "../hooks/useDeleteTodoById";
import type { TodoInterface } from "../types/TodoInterface";
import { TodoItemEdit } from "./TodoItemEdit";

export const TodoItem = ({
  todo,
  handleToggleTodo,
}: {
  todo: TodoInterface;
  handleToggleTodo: (todo: TodoInterface) => void;
}) => {
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [editedTodo, setEditedTodo] = useState();

  const deleteTodoMutation = useDeleteTodo();

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation.mutate({ todoId: id });
  };

  const handleEditTodo = (todo: TodoInterface) => {
    setIsEditingTodo(true);
    setEditedTodo(todo);
  };

  const handleCancelEditTodo = () => {
    setIsEditingTodo(false);
  };

  if (isEditingTodo) {
    return (
      <TodoItemEdit
        editedTodo={editedTodo}
        setEditedTodo={setEditedTodo}
        setIsEditingTodo={setIsEditingTodo}
        handleCancelEditTodo={handleCancelEditTodo}
      />
    );
  }

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBlock: "0.5rem",
        border: "1px solid gray",
        padding: "0.25rem",
        minHeight: "40.2px",
      }}
    >
      <span
        style={{
          textDecoration: todo.isCompleted ? "line-through" : "none",
          color: todo.isCompleted ? "gray" : "inherit",
          cursor: "pointer",
        }}
        onClick={() => handleToggleTodo(todo)}
      >
        {todo.title}
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {!todo.isCompleted && (
          <EditOutlined
            onClick={() => handleEditTodo(todo)}
            sx={{ color: "gray", "&:hover": { cursor: "pointer" } }}
          />
        )}
        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
      </div>
    </li>
  );
};
