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

  // Positive tests

  it("should edit a todo", () => {
    // Create a todo
    cy.getBySel("todo-input").type(validTodo.validTodoDesc)
    cy.getBySel("todo-submit").click()

    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`{enter}`)

    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("have.text", "Todos is required.")

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescShorterThan3Chars}{enter}`
    )

    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("have.text", "Todos cannot contain less than 3 characters.")

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescLongerThan40Chars}{enter}`
    )

    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("have.text", "Todos cannot contain more than 40 characters.")

    // Find and edit that existing todo
    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${validTodo.validTodoUpdateDesc}{enter}`
    )

    // Validate the todo is updated correctly
    cy.contains(validTodo.validTodoDesc).should("not.exist")
    cy.contains("[data-cy=todo-item]", validTodo.validTodoUpdateDesc).should(
      "exist"
    )

    //cy.get("body").matchImageSnapshot("Edited Todo")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
