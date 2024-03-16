import { useCallback } from "react";
import "./index.css";
import TodoList from "./components/todo/list";
import { LOCAL_STORAGE_KEY } from "./constants";
import { TodoItem } from "./components/todo/types";

const App = () => {
  const fetchTodoItemsInStorage = useCallback((): TodoItem[] => {
    const todoItemsJsonString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(todoItemsJsonString !== null) {
      return JSON.parse(todoItemsJsonString) as TodoItem[];
    }

    return [];
  }, []);

  return (
    <div className="flex flex-row justify-center p-4 h-screen w-full bg-slate-100">
      <TodoList items={fetchTodoItemsInStorage()} />
    </div>
  );
};

export default App;
