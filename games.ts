import { todo } from './todo.ts'

const todoItemsState1 = todo([], { type: "read", metadata: undefined })
console.log("---GAMES START HERE---")
console.log(todoItemsState1)

const todoItemsState2 = todo(todoItemsState1, { type: "create", metadata: {
  id: 1,
  description: "I should do so and so",
  isCompleted: false,
}})
console.log("---CREATE---")
console.log(todoItemsState2)

const todoItemsState3 = todo(todoItemsState2, { type: "update", metadata: {
  id: 1,
  isCompleted: true,
}})
console.log("---UPDATE---")
console.log(todoItemsState3)

const todoItemsState4 = todo(todoItemsState3, { type: "create", metadata: {
  id: 2,
  description: "I should also do so and so and so",
  isCompleted: false,
}})
console.log("---CREATE---")
console.log(todoItemsState4)

const todoItemsState5 = todo(todoItemsState4, { type: "delete", metadata: {
  id: 1,
}})
console.log("---DELETE---")
console.log(todoItemsState5)