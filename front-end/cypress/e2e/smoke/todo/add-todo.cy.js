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

describe("Todo Section - Add Todo Smoke tests", () => {
  before(() => {
    todoTestsPreconditions()
  })

  it('should add a todo by writing on input and clicking on a "Add todo" button', () => {
    // Check alert error message
    cy.getBySel("todo-submit").click()
    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("have.text", "Todo is required.")

    cy.getBySel("todo-input")
      .clear()
      .type(invalidTodo.todoDescShorterThan3Chars)
    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("have.text", "Todos cannot contain less than 3 characters.")

    cy.getBySel("todo-input")
      .clear()
      .type(invalidTodo.todoDescLongerThan40Chars)
    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("have.text", "Todos cannot contain more than 40 characters.")

    cy.getBySel("todo-input").clear().type(validTodo.validTodoDesc)
    cy.getBySel("todo-submit").click()

    cy.getBySel("todo-item").should("be.visible")

    //cy.get("body").matchImageSnapshot("Added Todo")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
