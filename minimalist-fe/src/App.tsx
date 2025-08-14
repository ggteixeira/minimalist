import "./App.css";
import ListOfTodos from "./components/ListOfTodos";
import { useAddTodo } from "./hooks/useAddtodo";
import { useForm } from "react-hook-form";

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

  const addTodoMutation = useAddTodo();

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodoMutation.mutate({ body: watch("title") });
  };

  console.log(watch("title"));

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
