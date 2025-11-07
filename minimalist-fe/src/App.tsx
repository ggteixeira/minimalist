import "./App.css";
import ListOfTodos from "./components/ListOfTodos";
import { useAddTodo } from "./hooks/useAddtodo";
import { useForm } from "react-hook-form";
import { invalidateGetTodo, usePostTodo } from "./http/generated/todo/todo";
import { client } from "./lib/react-query";

export default function App() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const addTodoMutation = usePostTodo();

  const handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addTodoMutation.mutateAsync({ data: { title: watch("title") } });
    invalidateGetTodo(client);
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
        <form onSubmit={handleAddTodo}>
          <input
            style={{
              border: "1px solid silver",
              padding: "0.5rem",
            }}
            type="text"
            value={watch("title")}
            {...register("title")}
            placeholder="Add new task"
            required
          />
          {errors.title && <span>Please add a todo</span>}

          <button type="submit" disabled={watch("title").length === 0}>
            Add
          </button>
        </form>
      </div>
      <ListOfTodos />
    </div>
  );
}
