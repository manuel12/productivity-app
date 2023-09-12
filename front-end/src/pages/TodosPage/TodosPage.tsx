import React from "react"
import CustomPage from "../CustomPage/CustomPage"
import TodoList from "../../components/TodosList/TodosList"

const TodoPage: React.FC = () => {
  return (
    <CustomPage
      headingText="To Dos"
      dataCyAttr="todos-heading"
      listComponent={TodoList}
    />
  )
}

export default TodoPage
