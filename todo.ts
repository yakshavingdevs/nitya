import { AnyTodoAction, InvalidActionTypeError, TodoItem } from "./types.ts"

export function todo(items: TodoItem[], action: AnyTodoAction): TodoItem[] {
  switch (action.type) {
    case "create":
      return [...items, action.metadata]
    case "read":
      return [...items]
    case "update":
      return items.map((item) => {
        if (item.id === action.metadata.id) {
          return { ...item, ...action.metadata }
        }

        return item
      })
    case "delete":
      return items.filter((item) => item.id !== action.metadata.id)
    default:
      throw new InvalidActionTypeError("The action type specificed has no action associated with it")
  }
}