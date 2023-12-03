/// <reference types="cypress" />

import { percentageDiff } from "../../../src/utils"

describe("Todo Section - Todo Statistics Display ", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  // Positive tests

  it("should display the number of completed todos for the day", () => {
    // Perform actions to add todos
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todos-input").type(`Todo #${i} (test){enter}`)
    }

    // Check initial completed todos displays 0
    cy.getBySel("statistics-daily-completed-todos").should(
      "include.text",
      "Completed todos:0"
    )

    // Perform actions to complete todos
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.get(`[data-cy="todos-list"] > :nth-child(${i})`)
        .find("[data-cy=todos-check-icon-container]")
        .click()

      cy.get(`[data-cy="todos-list"] > :nth-child(${i})`)
        .find("[data-cy=todos-check-icon-container]")
        .find(".fa-circle-check")
        .should("be.visible")
        .and("have.class", "check-completed")

      // Check completed todos number increases with each todo set as completed
      cy.getBySel("statistics-daily-completed-todos").should(
        "include.text",
        `Completed todos:${i}`
      )
    }
  })

  it.skip("should display the average number of completed todos per day", () => {
    // Perform actions to complete todos on different days (assuming todos are already added and completed)
    // ...

    // Validate the display of average completed todos per day
    cy.get(".average-completed-todos-per-day").should("exist")
    // Add more assertions as needed based on the specific implementation and UI structure
  })

  it("should display the percentage increase/decrease indicator for completed todos", () => {
    // Get number of average completed todos per day
    const numTodosToAdd = 10
    let completedTodos = 0
    let avgDailyCompletedTodos = 0

    cy.get(
      '[data-cy="statistics-daily-avg-completed-todos"] > .display-1'
    ).then(($el) => {
      avgDailyCompletedTodos = $el.text()

      // Check initial percentage displays a -100% decrease

      cy.getBySel("statistics-percentage-diff").should("contain", "-100%")

      // Perform actions to add todos
      for (let i = 1; i <= numTodosToAdd; i++) {
        cy.getBySel("todos-input").type(`Todo #${i} (test){enter}`)
      }

      // Perform actions to complete todos
      for (let i = 1; i <= numTodosToAdd; i++) {
        cy.getBySel("todos-item")
          .filter(":contains('test')")
          .eq(i - 1)
          //cy.get(`[data-cy="todos-list"] > :nth-child(${i})`)
          .find("[data-cy=todos-check-icon-container]")
          .click()

        completedTodos += 1

        // Calculate the average completed todos per day and the percentage increase/decrease
        const percentageDifference = percentageDiff(
          completedTodos,
          avgDailyCompletedTodos
        )

        // Validate the display of the percentage increase/decrease indicator
        cy.getBySel("statistics-percentage-diff").should("exist")
        cy.getBySel("statistics-percentage-diff").should(
          "contain",
          `${percentageDifference}%`
        )
      }
    })
  })

  afterEach(() => {
    cy.deleteTestTodos()
  })
})
