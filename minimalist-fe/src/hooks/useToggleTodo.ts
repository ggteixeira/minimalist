// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toggleTodo } from "../services/patchToggleTodo";
// import type { TodoInterface } from "../types/TodoInterface";
//
// export const useToggleTodo = () => {
//   const queryClient = useQueryClient();
//
//   return useMutation({
//     mutationFn: toggleTodo,
//     // mutationFn: ({ id, isCompleted }: TodoInterface) => {
//     //   toggleTodo(id, isCompleted);
//     // },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["todosData"] });
//     },
//   });
// };
