/// <reference types="cypress" />

describe("Todo Section - Edit Todo", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  it("Verify an existing todo can be edited and updates correctly", () => {
    const createdTodo = "Created Todo (test)"
    const updatedTodo = "Updated Todo Item (test)"

    // Create a todo
    cy.getBySel("todos-input").type(createdTodo)
    cy.getBySel("todos-submit").click()

    // Find and edit that existing todo
    cy.getBySel("todos-item")
      .filter(`:contains(${createdTodo})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`${updatedTodo}{enter}`)

    // Validate the todo is updated correctly
    cy.contains(createdTodo).should("not.exist")
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
