/// <reference types="cypress" />

const getTomorrowISODate = () => {
  const today = new Date()

  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const tomorrowISODate = tomorrow.toISOString().split("T")[0]
  return tomorrowISODate
}

describe("Daily Section - Next Day Activation", () => {
  beforeEach(() => {
    cy.visit("/dailies")
  })

  it("Verify completed dailies are reactivated at the start of the next day", () => {
    cy.getBySel("dailies-input").type("Clean room{enter}")
    cy.getBySel("dailies-input").type("Make lunch{enter}")
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

    const tomorrowISODate = getTomorrowISODate()
    const dateToTestDailies = new Date(tomorrowISODate)
    cy.clock(dateToTestDailies)
    cy.reload()

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
