/// <reference types="cypress" />

describe("Daily Section - Next Day Activation", () => {
  beforeEach(() => {
    cy.deleteTestDailies()
    cy.visit("/dailies")
  })

  // Positive tests

  it("should reactivate completed dailies at the start of the next day", () => {
    cy.getBySel("dailies-input").type("Clean room (test){enter}")
    cy.getBySel("dailies-input").type("Make lunch (test){enter}")
    cy.getBySel("dailies-item").each(($el) => {
      cy.get($el)
        .should("be.visible")
        .within(() => {
          cy.get(".fa-circle-check").click()
          cy.get(".fa-circle-check")
            .should("be.visible")
            .and("have.class", "check-completed")
        })
    })

    // Stub the Date object to make it tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1)
    cy.clock(tomorrow.getTime(), ["Date"])
    cy.reload(true)

    cy.getBySel("dailies-item").each(($el) => {
      cy.get($el)
        .should("be.visible")
        .within(() => {
          cy.get(".fa-circle-check")
            .should("be.visible")
            .and("have.class", "check-not-completed")
        })
    })
  })

  afterEach(() => {
    cy.deleteTestDailies()
  })
})
