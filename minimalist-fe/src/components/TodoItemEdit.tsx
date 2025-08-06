import { useEffect, useState } from "react";
import "../App.css";
import { useEditTodo } from "../hooks/useEditTodo";

export const TodoItemEdit = ({
  setIsEditingTodo,
  editedTodo,
  setEditedTodo,
}) => {
  const [userInput, setUserInput] = useState(editedTodo.title);

  useEffect(() => {
    // console.log(editedTodo);
  }, [editedTodo]);

  const editTodoMutation = useEditTodo();

  const handleChange = ({ target: { value } }) => {
    // console.log(value);
    setUserInput(value);
  };

  const handleSaveTodo = () => {
    setIsEditingTodo(false);
    // // console.log("editedTodo.id:");
    // console.log(editedTodo.id);
    editTodoMutation.mutate({ todo: editedTodo, body: userInput });
  };

  return (
    <div
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
          outline: "1px solid gray",
          backgroundColor: "#2B2A33",
          borderRadius: "8px",
          height: "48px",
          paddingLeft: "0.30rem",
          color: "silver",
        }}
        // onBlur={handleSaveTodo}
        onChange={handleChange}
        value={userInput}
        type="text"
        autoFocus
      />

      <div style={{ alignSelf: "center", minHeight: "40.2px" }}>
        <button onClick={handleSaveTodo}>Save</button>
      </div>
    </div>
  );
};
