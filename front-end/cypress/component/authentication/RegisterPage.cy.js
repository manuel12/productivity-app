/// <reference types="cypress" />

import RegisterPage from "../../../src/pages/RegisterPage/RegisterPage"

describe("RegisterPage", () => {
  beforeEach(() => {
    cy.mount(<RegisterPage />)
  })

  it("should display the register form.", () => {
    cy.get('[data-cy="register-form"]').should("be.visible")
  })
})
