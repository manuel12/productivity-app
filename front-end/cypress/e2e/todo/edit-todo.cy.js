/// <reference types="cypress" />

describe("Todo Section - Edit Todo", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  it("should edit a todo and update it correctly", () => {
    const updatedTodoText = "Updated Todo Item"

    // Create a todo
    cy.get("[data-cy=todos-input]").type("Existing Todo")
    cy.get('[data-cy="todos-submit"]').click()

    // Find and edit that existing todo
    //cy.contains(".todo-list-item", "Existing Todo").find(".edit-button").click()
    cy.get("[data-cy=todos-list]")
      .first()
      .within(() => {
        cy.get('[data-cy="todos-text-container"]').click()
        cy.get("input").clear()
        cy.get("input").type(`${updatedTodoText}{enter}`)
      })

    // Validate the todo is updated correctly
    cy.contains("Existing Todo").should("not.exist")
    cy.contains("[data-cy=todos-item]", updatedTodoText).should("exist")
  })
})
