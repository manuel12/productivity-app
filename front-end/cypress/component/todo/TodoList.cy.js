/// <reference types="cypress" />

import TodoList from "../../../src/components/TodosList/TodosList"

describe("TodoList", () => {
  const todos = [
    {
      description: "feed the cats",
      completed: false,
    },

    {
      description: "take out trash",
      completed: true,
    },
  ]

  beforeEach(() => {
    cy.mount(
      <TodoList todos={todos} setTodos={null} setNumCompletedTodos={null} />
    )
  })

  it("should display input with placeholder text 'Add new todos...'", () => {
    cy.getBySel("todo-input")
      .should("be.visible")
      .and("have.attr", "placeholder")
      .and("contain", "Add new todo...")
  })

  it("should display button with the text 'Add Todo'", () => {
    cy.getBySel("todo-submit")
      .should("be.visible")
      .and("contain.text", "Add Todo")
  })
})
