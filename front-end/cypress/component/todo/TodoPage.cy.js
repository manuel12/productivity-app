/// <reference types="cypress" />

import TodoPage from "../../../src/pages/TodosPage/TodosPage"

describe("TodoPage", () => {
  beforeEach(() => {
    cy.mount(<TodoPage />)
  })

  it('should display h1 heading with the text "To Dos"', () => {
    cy.get('[data-cy="todos-heading"]')
      .should("have.prop", "tagName", "H1")
      .and("have.text", "To Dos")
  })
})
