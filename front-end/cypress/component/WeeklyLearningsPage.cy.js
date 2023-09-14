/// <reference types="cypress" />

import WeeklyLearningsPage from "../../src/pages/WeeklyLearningsPage/WeeklyLearningPage"

describe("WeeklyLearningsPage.tsx tests", () => {
  beforeEach(() => {
    cy.mount(<WeeklyLearningsPage />)
  })

  it("should have a 'Weekly Learnings' heading", () => {
    cy.get("[data-cy=learnings-heading]")
      .should("have.class", "display-1")
      .and("have.text", "Weekly Learnings")
  })
})
