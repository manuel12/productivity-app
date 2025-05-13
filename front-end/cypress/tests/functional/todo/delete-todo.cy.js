/// <reference types="cypress" />

const todoData = require("../../../fixtures/todos/todoData.json")
const validTodo = todoData.validData

describe("Todo Section - Delete Todo", () => {
  const ctx = {}

  beforeEach(() => {
    // Cleanup
    cy.deleteTestUsers()
    cy.deleteTestTodos()

    cy.registerWithAPI()
    cy.loginWithAPI((res) => {
      ctx.token = res.body.token
      console.log(`Fetched token: ${ctx.token}`)
      window.localStorage.setItem("token", JSON.stringify(ctx.token))
    })

    // Visit the app or the specific page
    cy.visit("/")
    cy.getBySel("todo-input").type(validTodo.description1 + "{enter}")
  })

  // Positive tests

  it("should delete a todo and remove it from the list", () => {
    // 1. Find the todo with the text 'Feed the cats(test)'
    cy.step("Find the todo with the text 'Feed the cats(test)'")
    cy.step("Click on the todo's 'X' button")
    cy.contains(validTodo.description1)
      .parent()

      // 2. Click on the todo's 'X' button
      .find(".remove-icon-container")
      .click()

    // 3. Check the todo is deleted from the todo list
    cy.step("Check the todo is deleted from the todo list")
    cy.contains(validTodo.description1).should("not.exist")
  })

  it("should not show deleted todos after page reload", () => {
    // 1. Find the todo with the text 'Feed the cats(test)'
    cy.step("Find the todo with the text 'Feed the cats(test)'")
    cy.step("Click on the todo's 'X' button")
    cy.contains(validTodo.description1)
      .parent()

      // 2. Click on the todo's 'X' button
      .find(".remove-icon-container")
      .click()

    // 3. Reload the page
    cy.step("Reload the page")
    cy.reload()

    // 4. The todo remains deleted from the todo list
    cy.step("The todo remains deleted from the todo list")
    cy.contains(validTodo.description1).should("not.exist")
  })
})
