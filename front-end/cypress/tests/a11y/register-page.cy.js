/// <reference types="cypress" />

describe("Test Accessibility - Register page", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.getBySel("register-button").click()
  })

  it("should check accessibility in Register page", () => {
    cy.checkAccessibility()
  })
})
