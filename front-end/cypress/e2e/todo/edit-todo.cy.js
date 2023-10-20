/// <reference types="cypress" />

describe("Todo Section - Edit Todo", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  it("should edit a todo and update it correctly", () => {
    const updatedTodo = "Updated Todo Item (test)"

    // Create a todo
    cy.get("[data-cy=todos-input]").type("Existing Todo (test")
    cy.get('[data-cy="todos-submit"]').click()

    // Find and edit that existing todo
    //cy.contains(".todo-list-item", "Existing Todo").find(".edit-button").click()
    cy.get("[data-cy=todos-list]")
      .first()
      .within(() => {
        cy.get('[data-cy="todos-description-container"]').click()
        cy.get("input").clear()
        cy.get("input").type(`${updatedTodo}{enter}`)
      })

    // Validate the todo is updated correctly
    cy.contains("Existing Todo").should("not.exist")
    cy.contains("[data-cy=todos-item]", updatedTodo).should("exist")
  })

  afterEach(() => {
    // Call an API function that
    cy.request({
      method: "DELETE",
      url: "http://localhost:4000/api/todos/delete-test-todos/",
    })
  })
})
