import { useState } from "react";
import "../App.css";
import { useEditTodo } from "../hooks/useEditTodo";
import { CancelOutlined } from "@mui/icons-material";
import type { TodoInterface } from "../types/TodoInterface";

export const TodoItemEdit = ({
  setIsEditingTodo,
  editedTodo,
  handleCancelEditTodo,
}: {
  setIsEditingTodo: (_: boolean) => boolean;
  editedTodo: TodoInterface;
  handleCancelEditTodo: () => void;
}) => {
  const [userInput, setUserInput] = useState(editedTodo.title);

  const editTodoMutation = useEditTodo();

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(value);
  };

  const handleSaveTodo = () => {
    setIsEditingTodo(false);
    editTodoMutation.mutate({ todo: editedTodo, body: userInput });
  };

  return (
    <li
      style={{
        display: "flex",
        height: "50px",
        justifyContent: "space-between",
        alignItems: "center",
        marginBlock: "0.5rem",
        outline: "1px solid gray",
        borderRadius: "8px",
        padding: "0rem 0.25rem 0 0",
      }}
    >
      <input
        style={{
          border: "none",
          borderRadius: "8px",
          height: "48px",
          paddingLeft: "0.30rem",
          color: "silver",
        }}
        onChange={handleChange}
        value={userInput}
        type="text"
        autoFocus
      />

      <div
        style={{
          display: "flex",
          alignSelf: "center",
          minHeight: "40.2px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "silver",
            gap: "8px",
          }}
        >
          <CancelOutlined
            onClick={handleCancelEditTodo}
            sx={{ color: "gray", "&:hover": { cursor: "pointer" } }}
          />
          <button style={{ width: "88.8px" }} onClick={handleSaveTodo}>
            Save
          </button>
        </div>
      </div>
    </li>
  );
};
