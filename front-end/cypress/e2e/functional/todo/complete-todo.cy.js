/// <reference types="cypress" />

const validTodo = require("../../../fixtures/todo.json")

describe("Todo Section - Mark Todo as Complete:", () => {
  const ctx = {}

  beforeEach(() => {
    cy.deleteTestUsers(ctx.token)
    cy.registerWithAPI()
    cy.loginWithAPI((res) => {
      ctx.token = res.body.token
      console.log(`Fetched token: ${ctx.token}`)
      window.localStorage.setItem("token", JSON.stringify(ctx.token))
    })

    // Visit the app or the specific page
    cy.visit("/")
    cy.getBySel("todo-input").type(validTodo.validTodoDesc + "{enter}")
  })

  // Positive tests

  it("should mark a todo as complete", () => {
    // Validate that the todo with text 'Feed the cats (test)' has initially .check-not-completed class
    cy.getBySel("todo-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("todos-check-icon-container")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-not-completed")
          })
      })

    // Find the todo item complete button, then click it
    cy.getBySel("todo-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // Click the complete tab
    cy.get('[data-cy="complete-tab"]').click()

    // Validate that the todo with text 'Feed the cats (test)' has .check-completed class
    cy.getBySel("todo-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("todos-check-icon-container")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-completed")
          })
      })
  })

  it("should move the completed todo to the completed todos list", () => {
    // Find the todo item complete button, then click it
    cy.getBySel("todo-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // Click  on 'Completed' todo tab
    cy.getBySel("complete-tab").click()

    // Check there is 1 todo and it has the correct text
    cy.getBySel("todo-item")
      .should("have.length", 1)
      .and("have.text", validTodo.validTodoDesc)
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
