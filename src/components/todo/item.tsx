import { ChangeEventHandler, Dispatch, SetStateAction, useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CheckedState } from "@radix-ui/react-checkbox";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import { TodoItem } from "./types";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

export interface TodoListItemProps {
  item: TodoItem
  index: number
  setTodoItems: Dispatch<SetStateAction<TodoItem[]>>
}

const TodoListItem = ({ item, index, setTodoItems }: TodoListItemProps) => {
  const onCheckedChange = useCallback(
    (checked: CheckedState) => setTodoItems((currentTodoItems) => 
    currentTodoItems.map((todoItem) => ({
      ...todoItem,
      ...((todoItem.id === item.id && checked !== "indeterminate") && { isCompleted: checked }),
    }))),
    [item, setTodoItems]
  );

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => setTodoItems((currentTodoItems) => 
    currentTodoItems.map((todoItem) => ({
      ...todoItem,
      ...((todoItem.id === item.id) && { text: event.target.value }),
    }))),
    [item, setTodoItems]
  );

  const deleteItem = useCallback(
    () => setTodoItems((currentTodoItems) => 
    currentTodoItems.filter((todoItem) => todoItem.id !== item.id)),
    [item, setTodoItems]
  );

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="flex flex-row pb-4 items-center"
        >
          <span {...provided.dragHandleProps}>
            <DragHandleDots2Icon height={22} width={22} />
          </span>
          <Checkbox className="mx-2" onCheckedChange={onCheckedChange} />
          <Input
            value={item.text}
            disabled={item.isCompleted}
            className={item.isCompleted ? "line-through" : ""}
            placeholder="Enter here"
            onChange={onInputChange}
          />
          <TrashIcon
            role="button"
            className="ml-2 cursor-pointer"
            height={30}
            width={30}
            onClick={() => deleteItem()}
          />
        </div>
      )}
    </Draggable>
  );
};

export default TodoListItem;