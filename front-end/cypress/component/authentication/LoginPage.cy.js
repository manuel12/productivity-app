/// <reference types="cypress" />

import LoginPage from "../../../src/pages/LoginPage/LoginPage"

describe("LoginPage", () => {
  beforeEach(() => {
    cy.mount(<LoginPage />)
  })

  it("should display the login form", () => {
    cy.get('[data-cy="login-form"]').should("be.visible")
  })
})
