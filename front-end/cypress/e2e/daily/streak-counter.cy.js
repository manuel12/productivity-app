/// <reference types="cypress" />

const getDayAfterTomorrowISODate = () => {
  const today = new Date()
  console.log(today)

  const dayAfterTomorrow = new Date(today)
  dayAfterTomorrow.setDate(today.getDate() + 2)
  console.log(dayAfterTomorrow)

  const dayAfterTomorrowISODate = dayAfterTomorrow.toISOString().split("T")[0]
  return dayAfterTomorrowISODate
}

describe("Daily Section - Streak Counter", () => {
  beforeEach(() => {
    cy.visit("/dailies")
  })

  it("Verify the streak counter updates correctly when a daily todo is completed consecutively", () => {
    let initialStreakCounterValue
    let secondaryStreakCounterValue

    cy.get("[data-cy=dailies-input]").type("Clean room{enter}")
    cy.get("[data-cy=dailies-item]")
      .should("be.visible")
      .within(() => {
        cy.get(".streak-icon-container")
          .invoke("text")
          .then((text) => {
            initialStreakCounterValue = Number(text)
            expect(initialStreakCounterValue).to.eq(0)
          })

        cy.get("[data-cy=dailies-check-icon-container]")
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

  it("Verify the streak counter resets to 0 when a daily todo is not completed for more than 1 day", () => {
    cy.get("[data-cy=dailies-input]").type("Clean room{enter}")

    // Complete daily (in the current date)
    cy.get("[data-cy=dailies-check-icon-container]")
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

    // Go to a date +2 days in the future
    const dayAfterTomorrowISODate = getDayAfterTomorrowISODate()
    const dateToTestDailies = new Date(dayAfterTomorrowISODate)

    cy.clock(dateToTestDailies)
    cy.reload().then(() => {
      console.log(new Date())
      // Check that streak counter is back to 0
      cy.get(".streak-icon-container")
        .invoke("text")
        .then((text) => {
          let streakCounterValue = Number(text)
          expect(streakCounterValue).to.eq(0)
        })
    })
  })

  afterEach(() => {
    cy.deleteTestDailies()
  })
})
