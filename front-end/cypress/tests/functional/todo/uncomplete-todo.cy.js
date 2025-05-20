/// <reference types="cypress" />

const todoData = require("../../../fixtures/todos/todoData.json")
const validTodo = todoData.validData

describe("Todo Section - Mark Todo as Complete:", () => {
  const ctx = {}

  before(() => {
    // Cleanup
    cy.deleteTestUsers()

    cy.registerWithAPI()
  })

  beforeEach(() => {
    // Cleanup
    cy.deleteTestTodos()

    cy.loginWithAPI((res) => {
      ctx.token = res.body.token
      Cypress.env("token", ctx.token)
      console.log(`Fetched token: ${ctx.token}`)
      window.localStorage.setItem("token", JSON.stringify(ctx.token))
    }).then(() => {
      cy.createTodoWithAPI(validTodo.description1, true)
    })
    // Visit the app or the specific page
    cy.visit("/")
  })

  // Positive tests
  it("should uncomplete a todo", () => {
    // 1. Check the todo appears marked as completed in the completed tab
    cy.getBySel("complete-tab").click()

    cy.getBySel("todo-item").should("contain", validTodo.description1)

    // 2. Click on the checkmark icon to mark as uncompleted
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.description1})`)
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // 3. Check the todo disappears from the completed list
    cy.getBySel("todo-item").should("not.exist")

    // 4. Click on the uncompleted tab
    cy.getBySel("uncomplete-tab").click()

    // 5. Check the todo is displayed on the uncompleted list
    cy.getBySel("todo-item").should("contain", validTodo.description1)
  })

  it("should display uncompleted todos back in the uncompleted todo list", () => {
    // 1. Check the todo appears marked as completed in the completed tab
    cy.getBySel("complete-tab").click()
    cy.getBySel("todo-item").should("contain", validTodo.description1)

    // 2. Click on the checkmark icon to mark as uncompleted
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.description1})`)
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // 3. Check the todo disappears from the completed list
    cy.getBySel("todo-item").should("not.exist")

    // 4. Click on the uncompleted tab
    cy.getBySel("uncomplete-tab").click()

    // 5. Check the todo is displayed on the uncompleted list
    cy.get('[data-cy="todo-item"]').should("contain", validTodo.description1)
  })
})
