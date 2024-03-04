/// <reference types="cypress" />

import RegisterForm from "../../../src/forms/RegisterForm/RegisterForm"

describe("RegisterForm", () => {
  beforeEach(() => {
    cy.mount(<RegisterForm />)
  })

  it("should display an username input", () => {})

  it("should display an email input", () => {
    cy.get('[data-cy="email"]')
      .should("be.visible")
      .and("have.attr", "placeholder")
      .and("contain", "Email")
  })

  it("should display an password input", () => {
    cy.get('[data-cy="password"]')
      .should("be.visible")
      .and("have.attr", "placeholder")
      .and("contain", "Password")
  })

  it("should display an password confirmation input", () => {
    cy.get('[data-cy="password-confirmation"]')
      .should("be.visible")
      .and("have.attr", "placeholder")
      .and("contain", "Password confirmation")
  })

  it("should display a 'REGISTER' button", () => {
    cy.get('[data-cy="register-button"]').should("be.visible")
  })

  it("should have focus set on then username field", () => {
    cy.get('[data-cy="username"]').should("have.focus")
  })

  it("should display a password input field of type password", () => {
    cy.get('input[type="password"]').should("be.visible")
  })

  it("should display a password confirmation input field of type password", () => {
    cy.get('input[type="password"][data-cy="password-confirmation"]').should(
      "be.visible"
    )
  })

  it("should display a 'Already have an account? Login here!' link that redirects to login page", () => {
    cy.get(":nth-child(6) > label")
      .should("be.visible")
      .and("contain.text", "Already have an account?")
    cy.get('[data-cy="login-button"]').should("be.visible")
  })
})
