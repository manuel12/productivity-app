/// <reference types="cypress" />

const validTodo = require("../../../fixtures/todo.json")
const invalidTodo = require("../../../fixtures/invalidTodo.json")

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

describe("Todo Section - Edit Todo Smoke tests", () => {
  before(() => {
    todoTestsPreconditions()
  })

  beforeEach(() => {
    // Create a todo
    cy.getBySel("todo-input").type(validTodo.validTodoDesc)
    cy.getBySel("todo-submit").click()

    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("have.text", "Todos is required.")

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescShorterThan3Chars}{enter}`
    )

    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("have.text", "Todos must be at least 3 characters.")

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescLongerThan40Chars}{enter}`
    )

    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("have.text", "Todos cannot contain more than 40 characters.")
  })

  // Positive tests

  it("should edit a todo", () => {
    // 1. Click on the todo's description text to turn it into an input
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.getBySel("todos-text-input").clear()

    // 3. Enter todoDescription on the input
    cy.getBySel("todos-text-input").type(validTodo.validTodoDesc)

    // 4. Press ENTER key
    cy.getBySel("todos-text-input").type("{enter}")

    // 5. Check the old description text is not visible in the todo
    cy.getBySel("todos-text-input").should(
      "not.have.text",
      validTodo.validTodoDesc
    )

    // 6. Check the new description text is visible in the todo
    cy.getBySel("todos-text-input").should("have.text", validTodo.validTodoDesc)
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
