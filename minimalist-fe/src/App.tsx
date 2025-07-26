import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { useState } from "react";

type Todo = {
  id: number;
  text?: string;
  completed: boolean;
  isCompleted?: boolean;
  title?: string;
};

const ListOfTodos = ({
  todos,
  toggleTodo,
  deleteTodo,
}: {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}) => {
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

  if (isPending) return <span>"Loading..."</span>;
  if (error) return <span>"An error has occurred"</span>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {/* {todos.map((todo) => ( */}
      {/*   <li */}
      {/*     key={todo.id} */}
      {/*     style={{ */}
      {/*       display: "flex", */}
      {/*       justifyContent: "space-between", */}
      {/*       marginTop: "0.5rem", */}
      {/*     }} */}
      {/*   > */}
      {/*     <span */}
      {/*       style={{ */}
      {/*         textDecoration: todo.completed ? "line-through" : "none", */}
      {/*         cursor: "pointer", */}
      {/*       }} */}
      {/*       onClick={() => toggleTodo(todo.id)} */}
      {/*     > */}
      {/*       {todo.text} */}
      {/*     </span> */}
      {/*     <button onClick={() => deleteTodo(todo.id)}>Delete</button> */}
      {/*   </li> */}
      {/* ))} */}

      {todoData.map((todo: Todo) => {
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
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.title}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
        )
      })}
    </ul>
  );
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h1>Todo List</h1>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ListOfTodos
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}
