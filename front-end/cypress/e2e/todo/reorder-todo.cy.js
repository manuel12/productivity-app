/// <reference types="cypress" />

describe("Todo Section - Reorder Todos", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  it("should reorder todos by dragging them up and down and validate the order updates correctly", () => {
    cy.get("[data-cy=todos-input]").type("First Todo Item (test)") // Type the todo text
    cy.get('[data-cy="todos-submit"]').click() // Click on the "Add" button

    cy.get("[data-cy=todos-input]").type("Second Todo Item (test)")
    cy.get('[data-cy="todos-submit"]').click()

    // Find the todo items you want to reorder and drag them using Cypress commands
    const dataTransfer = new DataTransfer()
    cy.get("[data-cy=todos-item]")
      .first()
      .trigger("dragstart", { dataTransfer })

    cy.get('[data-cy="todos-list"] > :nth-child(2)').trigger("drop", {
      dataTransfer,
    })

    // Validate the order of todos has updated correctly after reordering
    // Check the visual indicators or specific order-related properties of todos
    // For example, you can check the text of todos to verify the order
    cy.get("[data-cy=todos-item]").eq(0).contains("Second Todo Item (test)") // Assuming 'First Todo Text' is the text of the first todo after reordering
    cy.get("[data-cy=todos-item]").eq(1).contains("First Todo Item (test)") // Assuming 'Second Todo Text' is the text of the second todo after reordering
  })

  afterEach(() => {
    // Call an API function that
    cy.request({
      method: "DELETE",
      url: "http://localhost:4000/api/todos/delete-test-todos/",
    })
  })
})
