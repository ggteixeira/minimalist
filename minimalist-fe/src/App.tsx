import { useState } from "react";
import "./App.css";
import ListOfTodos from "./components/ListOfTodos";

type TodoInterface = {
  id: number;
  text?: string;
  completed: boolean;
  isCompleted?: boolean;
  title?: string;
};

export default function App() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
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
        <button onClick={addTodo}>Add</button>
      </div>
      <ListOfTodos deleteTodo={deleteTodo} />
    </div>
  );
}
