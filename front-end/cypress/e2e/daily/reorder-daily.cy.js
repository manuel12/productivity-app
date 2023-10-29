/// <reference types="cypress" />

describe("Daily Section - Reorder Dailies", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/dailies")
  })

  it("Verify dailies can be reordered by dragging them up and down and the order updates correctly", () => {
    cy.getBySel("dailies-input").type("First Todo Item (test)") // Type the todo text
    cy.getBySel("dailies-submit").click() // Click on the "Add" button

    cy.getBySel("dailies-input").type("Second Todo Item (test)")
    cy.getBySel("dailies-submit").click()

    // Find the todo items you want to reorder and drag them using Cypress commands
    const dataTransfer = new DataTransfer()
    cy.getBySel("dailies-item")
      .filter(`:contains("test")`)
      .eq(0)
      .trigger("dragstart", { dataTransfer })

    cy.getBySel("dailies-item")
      .filter(`:contains("test")`)
      .eq(1)
      .trigger("drop", {
        dataTransfer,
      })

    // Verify the order of dailies has updated correctly after reordering
    cy.getBySel("dailies-item")
      .filter(`:contains("test")`)
      .eq(0)
      .contains("Second Todo Item (test)")
    cy.getBySel("dailies-item")
      .filter(`:contains("test")`)
      .eq(1)
      .contains("First Todo Item (test)")
  })

  it("Verify reordered dailies persists after a page reload", () => {
    cy.getBySel("dailies-input").type("First Todo Item (test)") // Type the todo text
    cy.getBySel("dailies-submit").click() // Click on the "Add" button

    cy.getBySel("dailies-input").type("Second Todo Item (test)")
    cy.getBySel("dailies-submit").click()

    // Find the todo items you want to reorder and drag them using Cypress commands
    const dataTransfer = new DataTransfer()
    cy.getBySel("dailies-item")
      .filter(`:contains("test")`)
      .eq(0)
      .trigger("dragstart", { dataTransfer })

    cy.getBySel("dailies-item")
      .filter(`:contains("test")`)
      .eq(1)
      .trigger("drop", {
        dataTransfer,
      })

    cy.reload()

    // Verify the order of dailies has updated correctly after reordering
    cy.getBySel("dailies-item")
      .filter(`:contains("test")`)
      .eq(0)
      .contains("Second Todo Item (test)")
    cy.getBySel("dailies-item")
      .filter(`:contains("test")`)
      .eq(1)
      .contains("First Todo Item (test)")
  })

  it("Verify reordered dailies can be edited and update correctly", () => {
    cy.getBySel("dailies-input").type("First Todo Item (test)") // Type the todo text
    cy.getBySel("dailies-submit").click() // Click on the "Add" button

    cy.getBySel("dailies-input").type("Second Todo Item (test)")
    cy.getBySel("dailies-submit").click()

    // Find the todo items you want to reorder and drag them using Cypress commands
    const dataTransfer = new DataTransfer()
    cy.getBySel("dailies-item")
      .filter(`:contains("test")`)
      .eq(0)
      .trigger("dragstart", { dataTransfer })

    cy.getBySel("dailies-item")
      .filter(`:contains("test")`)
      .eq(1)
      .trigger("drop", {
        dataTransfer,
      })

    cy.reload()

    // Verify the order of dailies has updated correctly after reordering
    cy.getBySel("dailies-item")
      .filter(`:contains("test")`)
      .eq(0)
      .contains("Second Todo Item (test)")
    cy.getBySel("dailies-item")
      .filter(`:contains("test")`)
      .eq(1)
      .contains("First Todo Item (test)")
  })

  afterEach(() => {
    cy.deleteTestDailies()
  })
})
