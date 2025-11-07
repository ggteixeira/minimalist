import { EditOutlined } from "@mui/icons-material";
import { useState } from "react";
import "../App.css";
import type { TodoInterface } from "../types/TodoInterface";
import { TodoItemEdit } from "./TodoItemEdit";
import {
  invalidateGetTodo,
  useDeleteTodoId,
} from "../http/generated/todo/todo";
import { client } from "../lib/react-query";

export const TodoItem = ({
  todo,
  handleToggleTodo,
}: {
  todo: TodoInterface;
  handleToggleTodo: (todo: TodoInterface) => void;
}) => {
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [editedTodo, setEditedTodo] = useState<TodoInterface>();

  const deleteTodoMutation = useDeleteTodoId();

  const handleDeleteTodo = async (todoId: number) => {
    await deleteTodoMutation.mutateAsync({ id: todoId });
    invalidateGetTodo(client);
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
        setIsEditingTodo={setIsEditingTodo}
        editedTodo={editedTodo!}
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
            sx={{ "&:hover": { cursor: "pointer" } }}
          />
        )}
        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
      </div>
    </li>
  );
};
