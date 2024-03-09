/// <reference types="cypress" />

import TStats from "../../../src/components/TodoStatistics/TodoStatistics"

describe("TodoStatistics", () => {
  const todos = [
    {
      description: "feed the cats",
      completed: false,
    },

    {
      description: "take out trash",
      completed: true,
    },
  ]

  beforeEach(() => {
    cy.mount(<TStats todos={todos} numCompletedTodos={1} />)
  })

  it("should display first statistics block with the text 'Completed today:'", () => {
    cy.getBySel("statistics-daily-completed-todos").should(
      "contain.text",
      "Completed today:"
    )
  })

  it("should display second statistics block with the text 'Avg daily completed:'", () => {
    cy.getBySel("statistics-daily-avg-completed-todos").should(
      "contain.text",
      "Avg daily completed:"
    )
  })

  it("should display third statistics block with the text 'Percentage difference:'", () => {
    cy.getBySel("statistics-percentage-diff").should(
      "contain.text",
      "Percentage difference:"
    )
  })
})
