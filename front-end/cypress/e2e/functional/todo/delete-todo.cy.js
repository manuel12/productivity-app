/// <reference types="cypress" />

describe("Todo Section - Delete Todo", () => {
  const todoTextToDelete = "Todo to Delete (test)"
  const ctx = {}

  beforeEach(() => {
    cy.deleteTestUsers(ctx.token)
    cy.registerWithAPI()
    cy.loginWithAPI((res) => {
      ctx.token = res.body.token
      console.log(`Fetched token: ${ctx.token}`)
      window.localStorage.setItem("token", JSON.stringify(ctx.token))
    })

    // Visit the app or the specific page
    cy.visit("/")
    cy.getBySel("todos-input").type(todoTextToDelete + "{enter}")
  })

  // Positive tests

  it("should delete a todo and remove it from the list", () => {
    // Find the todo item with text 'Todo to Delete' and locate its delete button, then click it
    cy.contains(todoTextToDelete)
      .parent()
      .find(".remove-icon-container")
      .click()

    // Verify that the todo with text 'Todo to Delete' no longer exists in the todo list
    cy.contains(todoTextToDelete).should("not.exist")
  })

  it("should not show deleted todos after page reload", () => {
    // Find the todo item with text 'Todo to Delete' and locate its delete button, then click it
    cy.contains(todoTextToDelete)
      .parent()
      .find(".remove-icon-container")
      .click()

    cy.reload()

    // Verify that the todo with text 'Todo to Delete' no longer exists in the todo list
    cy.contains(todoTextToDelete).should("not.exist")
  })

  afterEach(() => {
    cy.deleteTestUsers(ctx.token)
    cy.deleteTestTodos(ctx.token)
  })
})
