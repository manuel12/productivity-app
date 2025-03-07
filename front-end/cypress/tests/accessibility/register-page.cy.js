/// <reference types="cypress" />

describe("Test Accessibility - Register page", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.getBySel("register-button").click()
  })

  it("Check accessibility in Register page", () => {
    cy.checkAccessibility()
  })
})
