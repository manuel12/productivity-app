/// <reference types="cypress" />

describe("Test Accessibility - Login page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("should check accessibility in Login page", () => {
    cy.checkAccessibility()
  })
})
