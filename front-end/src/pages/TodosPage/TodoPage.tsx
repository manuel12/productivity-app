import React from "react"

import TodoList from "../../components/TodoList/TodoList"

const TodoPage: React.FC = () => {
  return (
    <>
      <div className="my-5">
        <h1 className="display-1">To Dos</h1>
        <TodoList />
      </div>
    </>
  )
}

export default TodoPage
