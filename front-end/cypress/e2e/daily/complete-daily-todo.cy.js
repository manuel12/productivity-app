/// <reference types="cypress" />

describe("Daily Section - Complete Daily Todo", () => {
  beforeEach(() => {
    cy.visit("/dailies")
  })

  it("Verify a daily todo can be marked as complete", () => {
    const todoTextToComplete = "Todo to Complete (test)"
    cy.getBySel("dailies-input").type(todoTextToComplete)
    cy.get('[data-cy="dailies-submit"]').click()

    // Verify that the daily todo with text 'Todo to Complete (test)' has initially .check--not-completed class
    cy.getBySel("dailies-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("dailies-check-icon-container")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-not-completed")
          })
      })

    // Find the todo item complete button, then click it
    cy.getBySel("dailies-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("dailies-check-icon-container").click()
      })

    // Verify that the todo with text 'Todo to Complete' has .check-completed class
    cy.getBySel("dailies-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("dailies-check-icon-container")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-completed")
          })
      })
  })

  it("Verify a daily todo text gets a line-though when marked as completed", () => {
    const todoTextToComplete = "Todo to Complete (test)"
    cy.getBySel("dailies-input").type(todoTextToComplete)
    cy.get('[data-cy="dailies-submit"]').click()

    // Verify daily todo text does not have line-through.
    cy.getBySel("dailies-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("dailies-description-container")
          .should("be.visible")
          .and("have.css", "text-decoration")
          .and("match", /none/)
      })

    // Find the todo item complete button, then click it
    cy.getBySel("dailies-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("dailies-check-icon-container").click()
      })

    // Verify daily todo text does have a line-through style
    cy.getBySel("dailies-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("dailies-description-container")
          .should("be.visible")
          .and("have.css", "text-decoration")
          .and("match", /line-through/)
      })
  })

  afterEach(() => {
    cy.deleteTestDailies()
  })
})
