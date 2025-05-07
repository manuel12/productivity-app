/// <reference types="cypress" />

import { qase } from "cypress-qase-reporter/mocha"

describe("Test Accessibility - Register page", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.getBySel("register-button").click()
  })

  qase(
    179,
    it("should check accessibility in Register page", () => {
      cy.checkAccessibility()
    })
  )
})
