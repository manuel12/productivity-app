/// <reference types="cypress" />

const todoData = require("../../../fixtures/todos/todoData.json")
const validTodo = todoData.validData

describe("Todo Section - Tabs", () => {
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
      // Create some initial todos
      const todoDescriptions = [
        validTodo.description1,
        validTodo.description2,
        validTodo.description3,
      ]
      todoDescriptions.forEach((todoDescription) => {
        cy.createTodoWithAPI(todoDescription)
      })
    })

    cy.visit("/")
  })

  // Positive tests

  it("should display 3 tabs above the todos list: 'All', 'Completed', 'Uncompleted' ", () => {
    // 1. Check there are 3 tabs above the todo list: 'Uncompleted', 'Completed', 'All'
    cy.step(
      "Check there are 3 tabs above the todo list: 'Uncompleted', 'Completed', 'All'"
    )
    cy.getBySel("todos-tabs")
      .should("be.visible")
      .within(() => {
        cy.getBySel("all-tab").should("have.text", "All")
        cy.getBySel("complete-tab").should("have.text", "Completed")
        cy.getBySel("uncomplete-tab").should("have.text", "Uncompleted")
      })
  })

  it("should by default have 'Uncompleted' tab active", () => {
    // 1. Check the 'Uncomplete' tab is active by default
    cy.step("Check the 'Uncomplete' tab is active by default")
    cy.getBySel("uncomplete-tab").should("have.class", "active")
  })

  it("should by default display all existing todos", () => {
    // 1. 1. Check all 3 existing todos are displayed by default
    cy.step("1. Check all 3 existing todos are displayed by default")
    cy.getBySel("todos-list")
      .should("be.visible")
      .within(() => {
        cy.getBySel("todo-item").should("be.visible").and("have.length", 3)
      })
  })

  it("should display all todos when user clicks on the 'All' tab", () => {
    // 1. Click on the 'All' tab
    cy.step("Click on the 'All' tab")
    cy.getBySel("all-tab").click()

    // 2. Check all 3 existing todos are displayed by default
    cy.step("Check all 3 existing todos are displayed by default")
    cy.getBySel("todos-list")
      .should("be.visible")
      .within(() => {
        cy.getBySel("todo-item").should("be.visible").and("have.length", 3)
      })
  })

  it("should display only completed todos when user clicks on the 'Completed' tab", () => {
    // 1. Mark 1 todo as completed
    cy.step("Mark 1 todo as completed")
    cy.getBySel("todo-item")
      .eq(0)
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // 2. Click on the 'Completed' tab
    cy.step("Click on the 'Completed' tab")
    cy.getBySel("complete-tab").click()

    // 3. Check only the todo marked as completed is visible
    cy.step("Check only the todo marked as completed is visible")
    cy.getBySel("todo-item").should("have.length", 1)
  })

  it("should display only uncomplete todos when user clicks on the 'Uncompleted' tab", () => {
    // 1. Mark 1 todo as completed
    cy.step("Mark 1 todo as completed")
    cy.getBySel("todo-item")
      .eq(0)
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // 2. Click on the 'Uncompleted' tab
    cy.step("Click on the 'Uncompleted' tab")
    cy.getBySel("uncomplete-tab").click()

    // 3. Check the 2 todos yet uncompeted are visible
    cy.step("Check the 2 todos yet uncompeted are visible")
    cy.getBySel("todo-item").should("have.length", 2)
  })

  it.skip("should only have 1 active tab at any moment", () => {
    // 1. Click on all the tabs
    cy.step("Click on all the tabs")

    // 2. Check only 1 tab is active at any moment
    cy.step("Check only 1 tab is active at any moment")
    cy.getBySel("todos-tabs").find(".active").should("have.length", 1)
  })

  it("should have as active tab the last tab clicked", () => {
    // 1. Click on all the tabs
    cy.step("Click on all the tabs")
    cy.getBySel("all-tab").click()

    // 2. Check after clicking each tab such tab becomes the active tab
    cy.step("Check after clicking each tab such tab becomes the active tab")
    cy.getBySel("all-tab").should("have.class", "active")

    // 3. Click on all the tabs
    cy.step("Click on all the tabs")
    cy.getBySel("complete-tab").click()

    // 4. Check after clicking each tab such tab becomes the active tab
    cy.step("Check after clicking each tab such tab becomes the active tab")
    cy.getBySel("complete-tab").should("have.class", "active")

    // 5. Click on all the tabs
    cy.step("Click on all the tabs")
    cy.getBySel("uncomplete-tab").click()

    // 6. Check after clicking each tab such tab becomes the active tab
    cy.step("Check after clicking each tab such tab becomes the active tab")
    cy.getBySel("uncomplete-tab").should("have.class", "active")
  })
})
