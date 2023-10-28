/// <reference types="cypress" />

describe("Daily Section - Edit Daily Todo", () => {
  beforeEach(() => {
    cy.visit("/dailies")
  })

  it("Verify an existing daily todo can be edited and updates correctly", () => {
    const createdTodo = "Created Todo (test)"
    const updatedTodo = "Updated Todo Item (test)"

    // Create a todo
    cy.getBySel("dailies-input").type(createdTodo)
    cy.getBySel("dailies-submit").click()

    // Find and edit that existing todo
    cy.getBySel("dailies-item")
      .filter(`:contains(${createdTodo})`)
      .within(() => {
        cy.getBySel("dailies-description-container").click()
      })

    cy.getBySel("dailies-text-input").clear()
    cy.getBySel("dailies-text-input").type(`${updatedTodo}{enter}`)

    // Validate the todo is updated correctly
    cy.contains(createdTodo).should("not.exist")
    cy.contains("[data-cy=dailies-item]", updatedTodo).should("exist")
  })

  afterEach(() => {
    // Call an API function that
    cy.request({
      method: "DELETE",
      url: "http://localhost:4000/api/todos/delete-test-todos/",
    })
  })
})
