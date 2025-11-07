import "../App.css";
import {
  invalidateGetTodo,
  useGetTodo,
  usePatchTodoIdComplete,
} from "../http/generated/todo/todo";
import { client } from "../lib/react-query";
import type { TodoInterface } from "../types/TodoInterface";
import { TodoItem } from "./TodoItem";

const ListOfTodos = () => {
  const { isPending, error, data: todoData } = useGetTodo();

  const toggleTodoMutation = usePatchTodoIdComplete();

  const handleToggleTodo = async ({ id, isCompleted }: TodoInterface) => {
    await toggleTodoMutation.mutateAsync({
      id,
      data: [
        {
          op: "replace",
          path: "/iscompleted",
          value: !isCompleted,
        },
      ],
    });

    invalidateGetTodo(client);
  };

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>An error has occurred</span>;

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
      }}
    >
      {todoData &&
        todoData.map((todo) => {
          console.log(todo);
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleToggleTodo={handleToggleTodo}
            />
          );
        })}
    </ul>
  );
};

export default ListOfTodos;
