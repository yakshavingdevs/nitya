import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, OnDragEndResponder } from "react-beautiful-dnd";
import { TodoItem } from "./types";
import TodoListItem from "./item";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { LOCAL_STORAGE_KEY } from "../../constants";

export interface TodoListProps {
  items: TodoItem[]
}

const TodoList = ({ items }: TodoListProps) => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(items);

  const onDragEnd = useCallback<OnDragEndResponder>((result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedTodoItems = [...todoItems];
    const [removed] = reorderedTodoItems.splice(result.source.index, 1);
    reorderedTodoItems.splice(result.destination.index, 0, removed);

    setTodoItems(reorderedTodoItems);
  }, [todoItems]);

  const addEmptyItem = useCallback(() => (
    setTodoItems([...todoItems, {
      id: `item-${todoItems.length}`,
      text: "",
      isCompleted: false,
    }])
  ), [todoItems]);

  /* Sync changes to localStorage */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Todo</CardTitle>
          <CardDescription>No sign-up required. Your data saved in your browser</CardDescription>
        </CardHeader>
        <CardContent>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todoItems.map((todoItem, index) => (
                  <TodoListItem
                    key={todoItem.id}
                    item={todoItem}
                    index={index}
                    setTodoItems={setTodoItems}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Button className="w-full" onClick={() => addEmptyItem()}>+ Add Item</Button>
        </CardContent>
      </Card>
    </DragDropContext>
  );
};

export default TodoList;