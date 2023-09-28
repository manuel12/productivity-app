import ITodo from "./ITodo"

export default interface ITodoItemProps {
  index: number
  todo: ITodo
  todos: ITodo[]
  setTodos: (todos: ITodo[]) => void
  setCompletedTodos: (completedTodos: number) => void
}
