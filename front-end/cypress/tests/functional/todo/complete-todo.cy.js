/// <reference types="cypress" />

const todoData = require("../../../fixtures/todos/todoData.json")
const validTodo = todoData.validData

describe("Todo Section - Mark Todo as Complete:", () => {
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

  it("should mark a todo as complete", () => {
    // 1. Check that first todo is not marked as completed (has grey checkmark icon)
    cy.step(
      "Check that first todo is not marked as completed (has grey checkmark icon)"
    )
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.description1})`)
      .within(() => {
        cy.getBySel("todos-check-icon-container")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-not-completed")
          })
      })

    // 2. Click on the checkmark icon to mark as completed
    cy.step("Click on the checkmark icon to mark as completed")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.description1})`)
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // Click the complete tab
    cy.get('[data-cy="complete-tab"]').click()

    // 3. Check the todo completed sound is played and the todo disappears from uncompleted list
    cy.step(
      "Check the todo completed sound is played and the todo disappears from uncompleted list"
    )
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.description1})`)
      .within(() => {
        cy.getBySel("todos-check-icon-container")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-completed")
          })
      })
  })

  it("should move the completed todo to the completed todos list", () => {
    // 1. Click on the checkmark icon to mark as completed
    cy.step("Click on the checkmark icon to mark as completed")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.description1})`)
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // 2. Click on the 'Completed' tab
    cy.step("Click on the 'Completed' tab")
    cy.getBySel("complete-tab").click()

    // 3. Check there is 1 todo on the completed tab and it has text 'Feed the cats (test)'
    cy.step(
      "Check there is 1 todo on the completed tab and it has text 'Feed the cats (test)'"
    )
    cy.getBySel("todo-item")
      .should("have.length", 1)
      .and("have.text", validTodo.description1)
  })
})
