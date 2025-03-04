/// <reference types="cypress" />

describe("Daily Section - Streak Counter", () => {
  beforeEach(() => {
    cy.visit("/dailies")
  })

  // Positive tests

  it("should update streak counter correctly when a daily is completed consecutively", () => {
    let initialStreakCounterValue
    let secondaryStreakCounterValue

    cy.getBySel("dailies-input").type("Clean room (test){enter}")
    cy.getBySel("dailies-item")
      .should("be.visible")
      .within(() => {
        cy.get(".streak-icon-container")
          .invoke("text")
          .then((text) => {
            initialStreakCounterValue = Number(text)
            expect(initialStreakCounterValue).to.eq(0)
          })

        cy.getBySel("dailies-check-icon-container")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-not-completed")
            cy.get(".fa-circle-check").click()
          })

        cy.get(".streak-icon-container")
          .invoke("text")
          .then((text) => {
            secondaryStreakCounterValue = Number(text)
            expect(secondaryStreakCounterValue).to.eq(
              initialStreakCounterValue + 1
            )
          })
      })
  })

  it("should reset the streak counter to 0 when a daily is not completed for more than 1 day", () => {
    cy.getBySel("dailies-input").type("Clean room (test){enter}")

    // Complete daily (in the current date)
    cy.getBySel("dailies-check-icon-container")
      .should("be.visible")
      .within(() => {
        cy.get(".fa-circle-check")
          .should("be.visible")
          .and("have.class", "check-not-completed")
        cy.get(".fa-circle-check").click()
      })

    cy.get(".streak-icon-container")
      .invoke("text")
      .then((text) => {
        const streakCounterValue = Number(text)
        expect(streakCounterValue).to.eq(1)
      })

    // Stub the Date object to make it +2 days in the future
    const dayAfterTomorrow = new Date()
    dayAfterTomorrow.setDate(new Date().getDate() + 2.1)

    cy.clock(dayAfterTomorrow)
    cy.reload(true)

    // Check that streak counter is back to 0
    cy.get(".streak-icon-container")
      .invoke("text")
      .then((text) => {
        let streakCounterValue = Number(text)
        expect(streakCounterValue).to.eq(0)
      })
  })

  afterEach(() => {
    cy.deleteTestDailies()
  })
})
