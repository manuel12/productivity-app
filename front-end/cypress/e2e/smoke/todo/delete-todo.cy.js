/// <reference types="cypress" />

const validTodo = require("../../../fixtures/todo.json")

const todoTestsPreconditions = () => {
  cy.deleteTestUsers()
  cy.deleteTestTodos()

  // Register testuser
  cy.registerWithAPI()

  // Login testuser
  cy.loginWithAPI((res) => {
    const token = res.body.token
    window.localStorage.setItem("token", JSON.stringify(token))
  })
  cy.visit("/")
}

describe("Todo Section - Delete Todo Smoke tests", () => {
  before(() => {
    todoTestsPreconditions()
  })

  it("should delete a todo and remove it from the list", () => {
    // Create a todo with the text 'Todo to Delete' that you want to delete

    cy.getBySel("todo-input").type(validTodo.validTodoToDeleteDesc)
    cy.getBySel("todo-submit").click()

    // Find the todo item with text 'Todo to Delete' and locate its delete button, then click it
    cy.contains(validTodo.validTodoToDeleteDesc)
      .parent()
      .find(".remove-icon-container")
      .click()

    // Verify that the todo with text 'Todo to Delete' no longer exists in the todo list
    cy.contains(validTodo.validTodoToDeleteDesc).should("not.exist")

    // cy.get("body").matchImageSnapshot("Deleted Todo")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
