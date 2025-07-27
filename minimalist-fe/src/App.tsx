import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

type TodoInterface = {
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
  handleToggleTodo,
}: {
  todos: Todo[];
  handleToggleTodo: (id: number) => void;
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
      {/*       onClick={() => handleToggleTodo(todo.id)} */}
      {/*     > */}
      {/*       {todo.text} */}
      {/*     </span> */}
      {/*     <button onClick={() => deleteTodo(todo.id)}>Delete</button> */}
      {/*   </li> */}
      {/* ))} */}

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
              onClick={() => handleToggleTodo(todo.id)}
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

export default function App() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // const mutation = useMutation({
  //   mutationFn: (toggleTodo) => {
  //     return fetch(`https://localhost:7071/todo/${toggleTodo.id}/complete`, {
  //       method: "post",
  //       mode: "cors",
  //       body: JSON.stringify(toggleTodo),
  //     });
  //   },
  // });

  useEffect(() => {
    console.log("todos (state):");
    console.log(todos);
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id: number, isCompleted) => {
    const response = axios.patch(`https://localhost:7071/todo/${id}/complete`, [
      {
        // isCompleted: isCompleted,
        op: "replace",
        path: "/iscompleted",
        value: "true",
      },
    ]);

    return response.data;

    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    //   ),
    // );
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

  const handleToggleTodo = () => {
    console.log("handleToggleTodo:");
    console.log(todos);
    togleTodoHook.mutate({ id: 12, isCompleted: true });
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
        // toggleTodo={toggleTodo}
        handleToggleTodo={handleToggleTodo}
        deleteTodo={deleteTodo}
        handleToggleTodo={handleToggleTodo}
      />
    </div>
  );
}
