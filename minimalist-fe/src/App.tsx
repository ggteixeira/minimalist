import { useState } from "react";
import "./App.css";
import ListOfTodos from "./components/ListOfTodos";
import { useAddTodo } from "./hooks/useAddtodo";

export default function App() {
  const [newTodo, setNewTodo] = useState("");

  const addTodoMutation = useAddTodo();

  const handleAddTodo = () => {
    addTodoMutation.mutate({ body: newTodo });
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "1rem",
      }}
    >
      <h1>Todo List</h1>
      <div style={{ display: "flex", gap: "0.5rem", borderRadius: "8px" }}>
        <input
          style={{
            border: "1px solid silver",
            padding: "0.5rem",
          }}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task"
        />
        <button disabled={newTodo.length === 0} onClick={handleAddTodo}>
          Add
        </button>
      </div>
      <ListOfTodos />
    </div>
  );
}
