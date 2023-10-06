/// <reference types="cypress" />

describe("Todo Section - Delete Todo", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  it("Should delete a todo and remove it from the todo list", () => {
    // Create a todo with the text 'Todo to Delete' that you want to delete
    const todoTextToDelete = "Todo to Delete"
    cy.get("[data-cy=todos-input]").type(todoTextToDelete)
    cy.get('[data-cy="todos-submit"]').click()

    // // Find the todo item with text 'Todo to Delete' and locate its delete button, then click it
    cy.contains(todoTextToDelete)
      .parent()
      .find(".remove-icon-container")
      .click()

    // // Validate that the todo with text 'Todo to Delete' no longer exists in the todo list
    cy.contains(todoTextToDelete).should("not.exist")
  })
})
