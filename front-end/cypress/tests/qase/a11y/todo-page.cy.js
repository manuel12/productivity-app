/// <reference types="cypress" />

import { qase } from "cypress-qase-reporter/mocha"

describe("Test Accessibility - Register page", () => {
  const ctx = {}
  beforeEach(() => {
    cy.registerWithAPI()
    cy.loginWithAPI((res) => {
      ctx.token = res.body.token
      console.log(`Fetched token: ${ctx.token}`)
      window.localStorage.setItem("token", JSON.stringify(ctx.token))
    })
    cy.visit("/")
  })
  qase(
    180,
    it("Check accessibility in Register page", () => {
      cy.checkAccessibility()
    })
  )
})
