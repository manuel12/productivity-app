/// <reference types="cypress" />

const validTodo = require("../../../fixtures/todo.json")
const invalidTodo = require("../../../fixtures/invalidTodo.json")

describe("Todo Section - Edit Todo", () => {
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

  it("should edit a todo", () => {
    // Find and edit that existing todo
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${validTodo.validTodoUpdateDesc}{enter}`
    )

    // Validate the todo is updated correctly
    cy.contains(validTodo.validTodoDesc).should("not.exist")
    cy.contains("[data-cy=todo-item]", validTodo.validTodoUpdateDesc).should(
      "exist"
    )
  })

  it("should persist edited todos after page reload", () => {
    // Find and edit that existing todo
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${validTodo.validTodoUpdateDesc}{enter}`
    )

    cy.reload()

    // Validate the todo is updated correctly
    cy.contains(validTodo.validTodoDesc).should("not.exist")
    cy.contains("[data-cy=todo-item]", validTodo.validTodoUpdateDesc).should(
      "exist"
    )
  })

  // Negative tests

  it("should not allow to edit a todo so it has more than 40 characters", () => {
    cy.getBySel("todos-list").should("have.length", 1)

    // Find and edit that existing todo
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescLongerThan40Chars}{enter}`
    )

    // Check that todo text input does not dissapear
    cy.getBySel("todos-text-input").should("be.visible")
  })

  it('should display an error label "Todos must be shorter than 40 characters." when edited todo exceeds that amount', () => {
    cy.getBySel("todos-list").should("have.length", 1)

    // Find and edit that existing todo
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescLongerThan40Chars}{enter}`
    )

    // Check error label
    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("contain.text", "Todos cannot contain more than 40 characters.")
  })

  it("should not allow to edit a todo so it has less than 3 characters", () => {
    cy.getBySel("todos-list").should("have.length", 1)

    // Find and edit that existing todo
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescShorterThan3Chars}{enter}`
    )

    // Check that todo text input does not dissapear
    cy.getBySel("todos-text-input").should("be.visible")
  })

  it('should display an error label "Todos must be at least 3 characters." when edited todo falls below that amount', () => {
    cy.getBySel("todos-list").should("have.length", 1)

    // Find and edit that existing todo
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescShorterThan3Chars}{enter}`
    )

    // Check error label
    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("contain.text", "Todos must be at least 3 characters.")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
