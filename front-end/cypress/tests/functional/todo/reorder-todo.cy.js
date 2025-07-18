/// <reference types="cypress" />

const todoData = require("../../../fixtures/todos/todoData.json")
const validTodo = todoData.validData

describe("Todo Section - Reorder Todos", () => {
  const ctx = {}

  beforeEach(() => {
    cy.deleteTestUsers(ctx.token)
    cy.registerWithAPI()
    cy.loginWithAPI((res) => {
      ctx.token = res.body.token
      console.log(`Fetched token: ${ctx.token}`)
      window.localStorage.setItem("token", JSON.stringify(ctx.token))
    })
    cy.visit("/")
    cy.login()
    // Visit the app or the specific page
    cy.visit("/")
  })

  // Positive tests

  it.skip("should reorder todos by dragging them up and down.", () => {
    cy.getBySel("todo-input").type(validTodo.description1) // Type the todo text
    cy.getBySel("todo-submit").click() // Click on the "Add" button

    cy.getBySel("todo-input").type(validTodo.description2)
    cy.getBySel("todo-submit").click()

    // Find the todo items you want to reorder and drag them using Cypress commands
    const dataTransfer = new DataTransfer()
    cy.getBySel("todo-item")
      .filter(`:contains("test")`)
      .eq(0)
      .trigger("dragstart", { dataTransfer })

    cy.getBySel("todo-item").filter(`:contains("test")`).eq(1).trigger("drop", {
      dataTransfer,
    })

    // Verify the order of todos has updated correctly after reordering
    cy.getBySel("todo-item")
      .filter(`:contains("test")`)
      .eq(0)
      .contains(validTodo.description2)
    cy.getBySel("todo-item")
      .filter(`:contains("test")`)
      .eq(1)
      .contains(validTodo.description1)
  })

  it.skip("should persist reordered todos order after page reload", () => {
    cy.getBySel("todo-input").type(validTodo.description1) // Type the todo text
    cy.getBySel("todo-submit").click() // Click on the "Add" button

    cy.getBySel("todo-input").type(validTodo.description2)
    cy.getBySel("todo-submit").click()

    // Find the todo items you want to reorder and drag them using Cypress commands
    const dataTransfer = new DataTransfer()
    cy.getBySel("todo-item")
      .filter(`:contains("test")`)
      .eq(0)
      .trigger("dragstart", { dataTransfer })

    cy.getBySel("todo-item").filter(`:contains("test")`).eq(1).trigger("drop", {
      dataTransfer,
    })

    cy.reload()

    // Verify the order of todos has updated correctly after reordering
    cy.getBySel("todo-item")
      .filter(`:contains("test")`)
      .eq(0)
      .contains(validTodo.description2)
    cy.getBySel("todo-item")
      .filter(`:contains("test")`)
      .eq(1)
      .contains(validTodo.description1)
  })

  it.skip("should edit reordered todos", () => {
    cy.getBySel("todo-input").type(validTodo.description1) // Type the todo text
    cy.getBySel("todo-submit").click() // Click on the "Add" button

    cy.getBySel("todo-input").type(validTodo.description2)
    cy.getBySel("todo-submit").click()

    // Find the todo items you want to reorder and drag them using Cypress commands
    const dataTransfer = new DataTransfer()
    cy.getBySel("todo-item")
      .filter(`:contains("test")`)
      .eq(0)
      .trigger("dragstart", { dataTransfer })

    cy.getBySel("todo-item").filter(`:contains("test")`).eq(1).trigger("drop", {
      dataTransfer,
    })

    cy.reload()

    // Verify the order of todos has updated correctly after reordering
    cy.getBySel("todo-item")
      .filter(`:contains("test")`)
      .eq(0)
      .contains(validTodo.description2)
    cy.getBySel("todo-item")
      .filter(`:contains("test")`)
      .eq(1)
      .contains(validTodo.description1)
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
