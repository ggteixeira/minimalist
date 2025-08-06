import "../App.css";
import type { TodoInterface } from "../types/TodoInterface";
import { useFetchTodos } from "../hooks/useFetchtodos";
import { useToggleTodo } from "../hooks/useToggleTodo";
import { TodoItem } from "./TodoItem";

const ListOfTodos = () => {
  const { isPending, error, data: todoData } = useFetchTodos();

  const toggleTodoMutation = useToggleTodo();

  const handleToggleTodo = (todo: TodoInterface) => {
    const body = [
      {
        op: "replace",
        path: "/iscompleted",
        value: !todo.isCompleted,
      },
    ];

    toggleTodoMutation.mutate({ todo, body });
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
      {todoData.map((todo: TodoInterface) => {
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
