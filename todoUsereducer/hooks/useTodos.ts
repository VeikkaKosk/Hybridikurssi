import { useReducer } from "react";

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

type Action =
  | { type: "ADD"; payload: string }
  | { type: "TOGGLE"; payload: string }
  | { type: "REMOVE"; payload: string };

const reducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "ADD":
      const newTodo: Todo = {
        id: Math.random().toString(),
        title: action.payload,
        done: false,
      };
      return [...state, newTodo];

    case "TOGGLE":
      return state.map((t) =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );

    case "REMOVE":
      return state.filter((t) => t.id !== action.payload);

    default:
      return state;
  }
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(reducer, []);

  const addTodo = (title: string) => dispatch({ type: "ADD", payload: title });
  const toggleTodo = (id: string) => dispatch({ type: "TOGGLE", payload: id });
  const removeTodo = (id: string) => dispatch({ type: "REMOVE", payload: id });

  return { todos, addTodo, toggleTodo, removeTodo };
};
