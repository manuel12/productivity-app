/// <reference types="cypress" />

describe("Daily Section - Reorder Dailies", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/dailies")
  })

  // Positive tests

  it("should reordered dailies by dragging them up and down", () => {
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

  it("should persist reordered dailies after a page reload", () => {
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

  it("should edit reordered dailies", () => {
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

  // afterEach(() => {
  //   cy.deleteTestDailies()
  // })
})
