/// <reference types="cypress" />

import TodosPage from "../../src/pages/TodosPage/TodosPage"

describe("TodoPage.tsx tests", () => {
  beforeEach(() => {
    cy.mount(<TodosPage />)
  })

  it("should have a 'To Dos' heading", () => {
    cy.get("[data-cy=todos-heading]")
      .should("have.class", "display-1")
      .and("have.text", "To Dos")
  })
})
