/// <reference types="cypress" />

describe("Todo Section - Mark Todo as Complete:", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  it("Should mark a todo as complete and move it to the completed todos list", () => {
    // Assuming there's a todo with the text 'Todo to Complete' that you want to mark as complete
    const todoTextToComplete = "Todo to Complete"
    cy.get("[data-cy=todos-input]").type(todoTextToComplete)
    cy.get('[data-cy="todos-submit"]').click()

    // Validate that the todo with text 'Todo to Complete' has initially .check--not-completed class
    cy.get("[data-cy=todos-item]")
      .should("be.visible")
      .within(() => {
        cy.get("[data-cy=todos-check-icon-container]")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-not-completed")
          })
      })

    // Find the todo item complete button, then click it
    cy.get("[data-cy=todos-item]")
      .should("be.visible")
      .within(() => {
        cy.get("[data-cy=todos-check-icon-container]").click()
      })

    // Validate that the todo with text 'Todo to Complete' has .check-completed class
    cy.get("[data-cy=todos-item]")
      .should("be.visible")
      .within(() => {
        cy.get("[data-cy=todos-check-icon-container]")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-completed")
          })
      })
  })
})
