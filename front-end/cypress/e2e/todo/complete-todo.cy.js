/// <reference types="cypress" />

describe("Todo Section - Mark Todo as Complete:", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  it("verify a todo can be marked as complete", () => {
    // Assuming there's a todo with the text 'Todo to Complete' that you want to mark as complete
    const todoTextToComplete = "Todo to Complete (test)"
    cy.getBySel("todos-input").type(todoTextToComplete)
    cy.get('[data-cy="todos-submit"]').click()

    // Validate that the todo with text 'Todo to Complete' has initially .check--not-completed class
    cy.getBySel("todos-item")
      .should("be.visible")
      .first()
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
      .should("be.visible")
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // Validate that the todo with text 'Todo to Complete' has .check-completed class
    cy.getBySel("todos-item")
      .should("be.visible")
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

  it("verify the todo moves to the completed todo list")

  afterEach(() => {
    // Call an API function that
    cy.request({
      method: "DELETE",
      url: "http://localhost:4000/api/todos/delete-test-todos/",
    })
  })
})
