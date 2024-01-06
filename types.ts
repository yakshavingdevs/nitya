export interface TodoItem {
  id: number
  description: string
  isCompleted: boolean
}

export interface TodoAction<K> {
  type: "create" | "read" | "update" | "delete"
  metadata: K
}

export type CreateActionMetadata = TodoItem

export interface CreateAction extends TodoAction<CreateActionMetadata> {
  type: "create"
}

export interface ReadAction extends TodoAction<undefined> {
  type: "read"
}

export type UpdateActionMetadata = Pick<TodoItem, "id"> & Partial<TodoItem>

export interface UpdateAction extends TodoAction<UpdateActionMetadata> {
  type: "update"
}

export type DeletActionMetadata = Pick<TodoItem, "id">

export interface DeleteAction extends TodoAction<DeletActionMetadata> {
  type: "delete"
}

export type AnyTodoAction = CreateAction | ReadAction | UpdateAction | DeleteAction

export class InvalidActionTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidActionTypeError";
  }
}