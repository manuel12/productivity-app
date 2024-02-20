/// <reference types="cypress" />

const validTodo = require("../../../fixtures/todo.json")

describe("Todo Section - Tabs", () => {
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

    // Create some initial todos
    const todos = [
      validTodo.validTodoDesc,
      validTodo.validTodoDesc2,
      validTodo.validTodoDesc3,
    ]
    todos.forEach((todo) => {
      cy.getBySel("todo-input").type(`${todo} {enter}`)
    })
  })

  // Positive tests

  it("should display 3 tabs above the todos list: 'All', 'Completed', 'Uncompleted' ", () => {
    cy.getBySel("todos-tabs")
      .should("be.visible")
      .within(() => {
        cy.getBySel("all-tab").should("have.text", "All")
        cy.getBySel("complete-tab").should("have.text", "Completed")
        cy.getBySel("uncomplete-tab").should("have.text", "Uncompleted")
      })
  })

  it("should by default have 'All' tab active", () => {
    cy.getBySel("all-tab").should("have.class", "active")
  })

  it("should by default display all existing todos", () => {
    cy.getBySel("todos-list")
      .should("be.visible")
      .within(() => {
        cy.getBySel("todo-item").should("be.visible").and("have.length", 3)
      })
  })

  it("should display all todos when user clicks on the 'All' tab", () => {
    cy.getBySel("all-tab").click()

    cy.getBySel("todos-list")
      .should("be.visible")
      .within(() => {
        cy.getBySel("todo-item").should("be.visible").and("have.length", 3)
      })
  })

  it("should display only completed todos when user clicks on the 'Completed' tab", () => {
    // Add 1 todo as completed.
    cy.getBySel("todo-item")
      .eq(0)
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // Click on completed tab
    cy.getBySel("complete-tab").click()

    // Check there is only 1 todo shown
    cy.getBySel("todo-item").should("have.length", 1)
  })

  it("should display only uncomplete todos when user clicks on the 'Uncompleted' tab", () => {
    // Add 1 todo as completed.
    cy.getBySel("todo-item")
      .eq(0)
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // Click on uncompleted tab
    cy.getBySel("uncomplete-tab").click()

    // Check there are 2 todos shown
    cy.getBySel("todo-item").should("have.length", 2)
  })

  it("should only have 1 active tab at any moment", () => {
    cy.getBySel("todos-tabs").find(".active").should("have.length", 1)
  })

  it("should have as active tab the last tab clicked", () => {
    // Click on All and check it has .active class
    cy.getBySel("all-tab").click()
    cy.getBySel("all-tab").should("have.class", "active")

    // Click on Complete and check it has .active class
    cy.getBySel("complete-tab").click()
    cy.getBySel("complete-tab").should("have.class", "active")

    // Click on Uncomplete and check it has .active class
    cy.getBySel("uncomplete-tab").click()
    cy.getBySel("uncomplete-tab").should("have.class", "active")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
