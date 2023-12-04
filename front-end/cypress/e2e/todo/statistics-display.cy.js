/// <reference types="cypress" />

import { percentageDiff } from "../../../src/utils"

describe("Todo Section - Todo Statistics Display ", () => {
  beforeEach(() => {
    cy.deleteTestTodos()
    // Visit the app or the specific page
    cy.visit("/")
  })

  // Positive tests

  it("should display the number of completed todos today", () => {
    // Perform actions to add todos (today)
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todos-input").type(`Todo #${i} (test){enter}`)
    }

    // Check initial completed todos displays 0
    cy.getBySel("statistics-daily-completed-todos").should(
      "include.text",
      "Completed todos today:0"
    )

    // Perform actions to complete todos (today)
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
        `Completed todos today:${i}`
      )
    }
  })

  it("should display the average number of completed todos per day", () => {
    // Add todos (today)
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todos-input").type(`Todo #${i} (test){enter}`)
    }

    // Complete todos (today)
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    cy.get('[data-cy="todos-list"]').should("be.visible")

    // Stub the Date object to make it tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1)
    cy.clock(tomorrow.getTime(), ["Date"])

    // Add todos (tomorrow)
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todos-input").type(
        `Todo #${i + numTodosToAdd} (test){enter}`
      )
    }

    // Complete todos (tomorrow)
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    cy.get('[data-cy="todos-list"]').should("be.visible")

    cy.get('[data-cy="statistics-daily-avg-completed-todos"]').should(
      "include.text",
      "Avg daily completed todos:5"
    )
  })

  it("should display the percentage increase/decrease indicator for completed todos", () => {
    // Add todos (today)
    const numTodosToAddToday = 1
    for (let i = 1; i <= numTodosToAddToday; i++) {
      cy.getBySel("todos-input").type(`Todo #${i}  (today) (test){enter}`)
    }

    // Complete todos (today)
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    // Stub the Date object to make it tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1)
    cy.clock(tomorrow.getTime(), ["Date"])

    // Add todos (tomorrow)
    const numTodosToAddTomorrow = 5
    for (let i = 1; i <= numTodosToAddTomorrow; i++) {
      cy.getBySel("todos-input").type(`Todo #${i} (tomorrow) (test){enter}`)
    }

    // Complete todos (tomorrow)
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    cy.get('[data-cy="statistics-percentage-diff"]').should(
      "include.text",
      "Percentage difference:+67%"
    )
  })

  afterEach(() => {
    cy.deleteTestTodos()
  })
})
