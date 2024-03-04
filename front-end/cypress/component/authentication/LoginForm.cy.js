/// <reference types="cypress" />

import LoginForm from "../../../src/forms/LoginForm/LoginForm"

describe("LoginForm", () => {
  beforeEach(() => {
    cy.mount(<LoginForm />)
  })

  it("should display a 'You need to login to continue.' text", () => {
    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "You need to login to continue.")
  })

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

  it("should display a 'Remember Me' button", () => {
    cy.get('[data-cy="remember-me-button"]').should("be.visible")

    cy.get('[data-cy="remember-me"]').should("be.visible")
  })

  it("should display a 'LOGIN' button", () => {
    cy.get('[data-cy="login-button"]').should("be.visible")
  })

  it("should display a 'CREATE ACCOUNT' button", () => {
    cy.get('[data-cy="register-button"]').should("be.visible")
  })

  it("should have focus set on then email field", () => {
    cy.get('[data-cy="email"]').should("have.focus")
  })

  it("should display a password input field of type password", () => {
    cy.get('input[type="password"]').should("be.visible")
  })
})
