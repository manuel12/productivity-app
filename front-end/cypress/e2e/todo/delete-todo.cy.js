/// <reference types="cypress" />

describe("Todo Section - Delete Todo", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  it("verify a todo can be deleted and removed from the todo list", () => {
    // Create a todo with the text 'Todo to Delete' that you want to delete
    const todoTextToDelete = "Todo to Delete (test)"
    cy.getBySel("todos-input").type(todoTextToDelete)
    cy.getBySel("todos-submit").click()

    // // Find the todo item with text 'Todo to Delete' and locate its delete button, then click it
    cy.contains(todoTextToDelete)
      .parent()
      .find(".remove-icon-container")
      .click()

    // // Validate that the todo with text 'Todo to Delete' no longer exists in the todo list
    cy.contains(todoTextToDelete).should("not.exist")
  })

  afterEach(() => {
    // Call an API function that
    cy.request({
      method: "DELETE",
      url: "http://localhost:4000/api/todos/delete-test-todos/",
    })
  })
})
