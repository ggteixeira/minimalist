import { useForm } from "react-hook-form";
import "./App.css";
import ListOfTodos from "./components/ListOfTodos";
import { invalidateGetTodo, usePostTodo } from "./http/generated/todo/todo";
import { client } from "./lib/react-query";

export default function App() {
  const {
    register,
    watch,
    setValue,
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
    setValue("title", "");
  };

  return (
    <>
      <h1>Todo List</h1>
      <form
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "8px",
        }}
        onSubmit={handleAddTodo}
      >
        <input
          style={{
            padding: "1rem",
            flexGrow: 1,
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
      <ListOfTodos />
    </>
  );
}
