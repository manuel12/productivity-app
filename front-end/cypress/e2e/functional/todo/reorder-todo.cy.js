/// <reference types="cypress" />

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
    cy.getBySel("todos-input").type("First Todo Item (test)") // Type the todo text
    cy.getBySel("todos-submit").click() // Click on the "Add" button

    cy.getBySel("todos-input").type("Second Todo Item (test)")
    cy.getBySel("todos-submit").click()

    // Find the todo items you want to reorder and drag them using Cypress commands
    const dataTransfer = new DataTransfer()
    cy.getBySel("todos-item")
      .filter(`:contains("test")`)
      .eq(0)
      .trigger("dragstart", { dataTransfer })

    cy.getBySel("todos-item")
      .filter(`:contains("test")`)
      .eq(1)
      .trigger("drop", {
        dataTransfer,
      })

    // Verify the order of todos has updated correctly after reordering
    cy.getBySel("todos-item")
      .filter(`:contains("test")`)
      .eq(0)
      .contains("Second Todo Item (test)")
    cy.getBySel("todos-item")
      .filter(`:contains("test")`)
      .eq(1)
      .contains("First Todo Item (test)")
  })

  it.skip("should persist reordered todos order after page reload", () => {
    cy.getBySel("todos-input").type("First Todo Item (test)") // Type the todo text
    cy.getBySel("todos-submit").click() // Click on the "Add" button

    cy.getBySel("todos-input").type("Second Todo Item (test)")
    cy.getBySel("todos-submit").click()

    // Find the todo items you want to reorder and drag them using Cypress commands
    const dataTransfer = new DataTransfer()
    cy.getBySel("todos-item")
      .filter(`:contains("test")`)
      .eq(0)
      .trigger("dragstart", { dataTransfer })

    cy.getBySel("todos-item")
      .filter(`:contains("test")`)
      .eq(1)
      .trigger("drop", {
        dataTransfer,
      })

    cy.reload()

    // Verify the order of todos has updated correctly after reordering
    cy.getBySel("todos-item")
      .filter(`:contains("test")`)
      .eq(0)
      .contains("Second Todo Item (test)")
    cy.getBySel("todos-item")
      .filter(`:contains("test")`)
      .eq(1)
      .contains("First Todo Item (test)")
  })

  it.skip("should edit reordered todos", () => {
    cy.getBySel("todos-input").type("First Todo Item (test)") // Type the todo text
    cy.getBySel("todos-submit").click() // Click on the "Add" button

    cy.getBySel("todos-input").type("Second Todo Item (test)")
    cy.getBySel("todos-submit").click()

    // Find the todo items you want to reorder and drag them using Cypress commands
    const dataTransfer = new DataTransfer()
    cy.getBySel("todos-item")
      .filter(`:contains("test")`)
      .eq(0)
      .trigger("dragstart", { dataTransfer })

    cy.getBySel("todos-item")
      .filter(`:contains("test")`)
      .eq(1)
      .trigger("drop", {
        dataTransfer,
      })

    cy.reload()

    // Verify the order of todos has updated correctly after reordering
    cy.getBySel("todos-item")
      .filter(`:contains("test")`)
      .eq(0)
      .contains("Second Todo Item (test)")
    cy.getBySel("todos-item")
      .filter(`:contains("test")`)
      .eq(1)
      .contains("First Todo Item (test)")
  })

  afterEach(() => {
    cy.deleteTestUsers(ctx.token)
    cy.deleteTestTodos(ctx.token)
  })
})
