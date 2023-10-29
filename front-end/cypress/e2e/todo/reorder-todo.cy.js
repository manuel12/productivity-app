/// <reference types="cypress" />

describe("Todo Section - Reorder Todos", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  it("Verify todos can be reordered by dragging them up and down and the order updates correctly", () => {
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

  it("Verify reordered todos persists after a page reload", () => {
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

  it("Verify reordered todos can be edited and update correctly", () => {
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
    cy.deleteTestTodos()
  })
})
