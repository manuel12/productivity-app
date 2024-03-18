/// <reference types="cypress" />

const validTodo = require("../../../fixtures/todo.json")
const invalidTodo = require("../../../fixtures/invalidTodo.json")

describe("Todo Section - Add Todo", () => {
  const todoTextWith40Char = invalidTodo.todoDescLongerThan40Chars.slice(0, 40)

  const ctx = {}

  beforeEach(() => {
    cy.registerWithAPI()
    cy.loginWithAPI((res) => {
      ctx.token = res.body.token
      console.log(`Fetched token: ${ctx.token}`)
      window.localStorage.setItem("token", JSON.stringify(ctx.token))
    })
    cy.visit("/")
  })

  // Positive tests

  it('should add a todo by writing on input and clicking on a "Add todo" button', () => {
    cy.getBySel("todo-input").type(validTodo.validTodoDesc)
    cy.getBySel("todo-submit").click()

    cy.getBySel("todo-item").should("be.visible")
  })

  it("should add a todo by writing on input and pressing enter key", () => {
    cy.getBySel("todo-input").type(validTodo.validTodoDesc2 + "{enter}")

    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list")
      .first()
      .should("contain.text", validTodo.validTodoDesc2)

    cy.getBySel("todo-input").type(validTodo.validTodoDesc3 + "{ENTER}")

    cy.getBySel("todos-list")
      .first()
      .should("contain.text", validTodo.validTodoDesc3)
  })

  it("should display addded todos correctly on the list", () => {
    cy.getBySel("todo-input").type(validTodo.validTodoDesc + "{enter}")

    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list")
      .first()
      .should("contain.text", validTodo.validTodoDesc)
  })

  it("should persist todos after page reload", () => {
    cy.getBySel("todo-input").type(validTodo.validTodoDesc + "{enter}")

    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list")
      .first()
      .should("contain.text", validTodo.validTodoDesc)

    cy.reload()
    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list")
      .first()
      .should("contain.text", validTodo.validTodoDesc)
  })

  // Negative tests

  it("should not allow to add a todo with more than 40 characters", () => {
    cy.getBySel("todo-input").type(
      invalidTodo.todoDescLongerThan40Chars + "{enter}"
    )

    cy.getBySel("todo-input").should("contain.value", todoTextWith40Char)
    cy.getBySel("todo-item").should("have.length", 0)
  })

  it('should display an error label "Todos must be shorter than 40 characters." when exceeding that amount', () => {
    cy.getBySel("todo-input").type(
      invalidTodo.todoDescLongerThan40Chars + "{enter}"
    )

    cy.getBySel("input-error-label").should(
      "have.text",
      "Todos cannot contain more than 40 characters."
    )
  })

  it("should not allow to add a todo when leaving input field empty", () => {
    // Check current number of existing todos
    cy.getBySel("todo-item").should("have.length.gte", 0)

    // Click on submit button
    cy.getBySel("todo-submit").click()

    // Check current number of todos remains the same
    cy.getBySel("todo-item").should("have.length.gte", 0)
  })

  it('should display an error label "Todos must be at least 3 characters." when falling below that amount', () => {
    // At the beginning  when todo is empty it should not show any error message
    cy.getBySel("input-error-label").should("not.exist")

    // When the user adds a todo with less than 3 characters and submits the error label
    // should be shown
    cy.getBySel("todo-input").type(
      invalidTodo.todoDescShorterThan3Chars + "{enter}"
    )

    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("contain.text", "Todos cannot contain less than 3 characters.")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
