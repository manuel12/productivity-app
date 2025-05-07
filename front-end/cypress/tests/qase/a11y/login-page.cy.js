/// <reference types="cypress" />

import { qase } from "cypress-qase-reporter/mocha"

describe("Test Accessibility - Login page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  qase(
    178,
    it("should check accessibility in Login page", () => {
      cy.checkAccessibility()
    })
  )
})
