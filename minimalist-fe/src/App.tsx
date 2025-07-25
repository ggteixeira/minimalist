import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const TodoList = () => {
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

  if (isPending) return "Loading...";

  if (error) return `An error has occurred: ${error.message}`;

  interface ITodo {
    title: string;
  }

  return (
    <div>
      <h1>Todos List</h1>

      {todoData.map((todo: ITodo) => {
        return (
          <ul>
            <li>{todo.title}</li>
          </ul>
        );
      })}
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Counter /> */}
      <TodoList />
    </QueryClientProvider>
  );
}

export default App;
