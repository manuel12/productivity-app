/// <reference types="cypress" />

import { qase } from "cypress-qase-reporter/mocha"

const validTodo = require("../../../../fixtures/todo.json")

describe("Todo Section - Delete Todo", () => {
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
    cy.getBySel("todo-input").type(validTodo.validTodoDesc + "{enter}")
  })

  // Positive tests

  qase(
    50,
    it("should delete a todo and remove it from the list", () => {
      // 1. Find the todo with the text 'Feed the cats(test)'
      cy.step("Find the todo with the text 'Feed the cats(test)'")
      cy.step("Click on the todo's 'X' button")
      cy.contains(validTodo.validTodoDesc)
        .parent()

        // 2. Click on the todo's 'X' button
        .find(".remove-icon-container")
        .click()

      // 3. Check the todo is deleted from the todo list
      cy.step("Check the todo is deleted from the todo list")
      cy.contains(validTodo.validTodoDesc).should("not.exist")
    })
  )

  qase(
    51,
    it("should not show deleted todos after page reload", () => {
      // 1. Find the todo with the text 'Feed the cats(test)'
      cy.step("Find the todo with the text 'Feed the cats(test)'")
      cy.step("Click on the todo's 'X' button")
      cy.contains(validTodo.validTodoDesc)
        .parent()

        // 2. Click on the todo's 'X' button
        .find(".remove-icon-container")
        .click()

      // 3. Reload the page
      cy.step("Reload the page")
      cy.reload()

      // 4. The todo remains deleted from the todo list
      cy.step("The todo remains deleted from the todo list")
      cy.contains(validTodo.validTodoDesc).should("not.exist")
    })
  )

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
