/// <reference types="cypress" />

import TodoPage from "../../../src/pages/TodosPage/TodosPage"

describe("Todo Section", () => {
  beforeEach(() => {
    cy.mount(<TodoPage />)
  })

  it('Verify an h1 heading with the text "To Dos" is displayed', () => {
    cy.get('[data-cy="todos-heading"]')
      .should("have.prop", "tagName", "H1")
      .and("have.text", "To Dos")
  })

  it('Verify the first statistics block displays the text "Completed todos:"', () => {
    cy.get('[data-cy="statistics-daily-completed-todos"]').should(
      "contain.text",
      "Completed todos:"
    )
  })

  it('Verify the second statistics block displays the text "Avg daily completed todos:"', () => {
    cy.get('[data-cy="statistics-daily-avg-completed-todos"]').should(
      "contain.text",
      "Avg daily completed todos:"
    )
  })

  it('Verify the third statistics block displays the text "Percentage difference:"', () => {
    cy.get('[data-cy="statistics-percentage-diff"]').should(
      "contain.text",
      "Percentage difference:"
    )
  })

  it('Verify the input has placeholder text "Add new todos..."', () => {
    cy.get('[data-cy="todos-input"]').should(
      "have.attr",
      "placeholder",
      "Add new todos..."
    )
  })

  it('Verify the button has text "Add Todo"', () => {
    cy.get('[data-cy="todos-submit"]').should("have.text", "Add Todo")
  })
})
