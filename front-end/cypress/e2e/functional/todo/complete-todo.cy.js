/// <reference types="cypress" />

describe("Todo Section - Mark Todo as Complete:", () => {
  const todoTextToComplete = "Todo to Complete (test)"

  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  // Positive tests

  it("should mark a todo as complete", () => {
    cy.getBySel("todos-input").type(todoTextToComplete)
    cy.get('[data-cy="todos-submit"]').click()

    // Validate that the todo with text 'Todo to Complete' has initially .check--not-completed class
    cy.getBySel("todos-item")
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
    cy.getBySel("todos-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // Validate that the todo with text 'Todo to Complete' has .check-completed class
    cy.getBySel("todos-item")
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
    cy.getBySel("todos-input").type(todoTextToComplete)
    cy.get('[data-cy="todos-submit"]').click()

    // Find the todo item complete button, then click it
    cy.getBySel("todos-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // Click  on 'Completed' todo tab
    cy.get(".nav-item > :nth-child(2)").click()

    // Check there is 1 todo and it has the correct text
    cy.getBySel("todos-item")
      .should("have.length", 1)
      .and("have.text", todoTextToComplete)
  })

  afterEach(() => {
    cy.deleteTestTodos()
  })
})
