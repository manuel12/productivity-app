/// <reference types="cypress" />

describe("Test Accessibility - Login page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Check accessibility in Login page", () => {
    cy.checkAccessibility()
  })
})
