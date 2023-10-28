/// <reference types="cypress" />

describe("Daily Section - Delete Daily Todo", () => {
  beforeEach(() => {
    cy.visit("/dailies")
  })

  it("Verify a daily todo can be deleted and removed from the todo list", () => {
    // Create a todo with the text 'Todo to Delete' that you want to delete
    const todoTextToDelete = "Todo to Delete (test)"
    cy.getBySel("dailies-input").type(todoTextToDelete)
    cy.getBySel("dailies-submit").click()

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
