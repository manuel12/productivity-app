import "./styles.css"
import React, { useEffect } from "react"
import { ITodo } from "../../interfaces/interfaces"

interface ITabsProps {
  tabState: any
  setTabState: (tabState: any) => void
  setListTodos: (todos: any) => void
  todos: ITodo[]
  completedTodos: ITodo[]
  uncompletedTodos: ITodo[]
}

const Tabs: React.FC<ITabsProps> = ({
  tabState,
  setTabState,
  setListTodos,
  todos,
  completedTodos,
  uncompletedTodos,
}) => {
  function sortTodoObjects(todoArray: ITodo[]) {
    return todoArray.sort((a, b) => {
      const numA = parseInt(a.description.split(" ")[1])
      const numB = parseInt(b.description.split(" ")[1])
      return numA - numB
    })
  }

  return (
    <ul className="nav nav-tabs my-3 mx-auto" data-cy="todos-tabs">
      <li className="nav-item">
        <div
          className={`nav-link ${tabState.uncomplete}`}
          aria-current={tabState.uncomplete}
          onClick={() => {
            setTabState({
              all: "",
              complete: "",
              uncomplete: "active",
            })
            setListTodos(uncompletedTodos)
          }}
          data-cy="uncomplete-tab"
        >
          Uncompleted
        </div>
      </li>

      <li className="nav-item">
        <div
          className={`nav-link ${tabState.complete}`}
          aria-current={tabState.complete}
          onClick={() => {
            setTabState({
              all: "",
              complete: "active",
              uncomplete: "",
            })
            setListTodos(completedTodos)
          }}
          data-cy="complete-tab"
        >
          Completed
        </div>
      </li>

      <li className="nav-item">
        <div
          className={`nav-link ${tabState.all}`}
          aria-current={tabState.all}
          onClick={() => {
            setTabState({
              all: "active",
              complete: "",
              uncomplete: "",
            })

            setListTodos(todos)
          }}
          data-cy="all-tab"
        >
          All
        </div>
      </li>
    </ul>
  )
}

export default Tabs
