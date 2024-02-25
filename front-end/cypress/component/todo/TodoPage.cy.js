/// <reference types="cypress" />

import TodoPage from "../../../src/pages/TodosPage/TodosPage"

describe("Todo Section", () => {
  beforeEach(() => {
    cy.mount(<TodoPage />)
  })

  it('should display h1 heading with the text "To Dos"', () => {
    cy.get('[data-cy="todos-heading"]')
      .should("have.prop", "tagName", "H1")
      .and("have.text", "To Dos")
  })

  it('should display first statistics block with the text "Completed todos:"', () => {
    cy.get('[data-cy="statistics-daily-completed-todos"]').should(
      "contain.text",
      "Completed todos:"
    )
  })

  it('should display second statistics block with the text "Avg daily completed todos:"', () => {
    cy.get('[data-cy="statistics-daily-avg-completed-todos"]').should(
      "contain.text",
      "Avg daily completed todos:"
    )
  })

  it('should display third statistics block with the text "Percentage difference:"', () => {
    cy.get('[data-cy="statistics-percentage-diff"]').should(
      "contain.text",
      "Percentage difference:"
    )
  })

  it('should display input with placeholder text "Add new todos..."', () => {
    cy.get('[data-cy="todo-input"]').should(
      "have.attr",
      "placeholder",
      "Add new todos..."
    )
  })

  it('should display button with the text "Add Todo"', () => {
    cy.get('[data-cy="todos-submit"]').should("have.text", "Add Todo")
  })
})
