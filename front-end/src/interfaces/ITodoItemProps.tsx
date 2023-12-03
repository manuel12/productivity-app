import ITodo from "./ITodo"

export default interface ITodoItemProps {
  index: number
  todo: ITodo
  todos: ITodo[]
  setTodos: (todos: ITodo[]) => void
  setNumCompletedTodos: (numCompletedTodos: number) => void
}
