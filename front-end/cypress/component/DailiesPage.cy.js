/// <reference types="cypress" />

import DailiesPage from "../../src/pages/DailiesPage/DailyPage"

describe("DailiesPage.tsx tests", () => {
  beforeEach(() => {
    cy.mount(<DailiesPage />)
  })

  it("should have a 'To Dos' heading", () => {
    cy.get("[data-cy=dailies-heading]")
      .should("have.class", "display-1")
      .and("have.text", "Dailies")
  })
})
