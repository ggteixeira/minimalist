import { CancelOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import "../App.css";
import { invalidateGetTodo, usePatchTodoId } from "../http/generated/todo/todo";
import { client } from "../lib/react-query";
import type { TodoInterface } from "../types/TodoInterface";

export const TodoItemEdit = ({
  editedTodo,
  handleCancelEditTodo,
  setIsEditingTodo,
}: {
  editedTodo: TodoInterface;
  handleCancelEditTodo: () => void;
  setIsEditingTodo: (state: boolean) => void;
}) => {
  const { register, watch } = useForm({
    defaultValues: {
      editValue: editedTodo.title,
    },
  });

  const editTodoMutation = usePatchTodoId();

  const handleSaveTodo = async (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
    await editTodoMutation.mutateAsync({
      id: editedTodo.id,
      data: [
        {
          op: "replace",
          path: "/title",
          value: watch("editValue") || "",
        },
      ],
    });
    setIsEditingTodo(false);
    invalidateGetTodo(client);
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
      <form onSubmit={handleSaveTodo}>
        <input
          style={{
            border: "none",
            borderRadius: "8px",
            height: "48px",
            paddingLeft: "0.30rem",
            color: "gray",
            fontSize: "16px",
          }}
          {...register("editValue")}
          value={watch("editValue")}
          type="text"
          autoFocus
        />
      </form>

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
