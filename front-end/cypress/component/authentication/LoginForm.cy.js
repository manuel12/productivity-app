/// <reference types="cypress" />

import LoginForm from "../../../src/forms/LoginForm/LoginForm"

describe("LoginForm", () => {
  beforeEach(() => {
    cy.mount(<LoginForm />)
  })

  it("should display a 'You need to login to continue.' text", () => {
    cy.getBySel("login-alert")
      .should("be.visible")
      .and("contain.text", "You need to login to continue.")
  })

  it("should display an email input", () => {
    cy.getBySel("email")
      .should("be.visible")
      .and("have.attr", "placeholder")
      .and("contain", "Email")
  })

  it("should display an password input", () => {
    cy.getBySel("password")
      .should("be.visible")
      .and("have.attr", "placeholder")
      .and("contain", "Password")
  })

  it("should display a 'Remember Me' button", () => {
    cy.getBySel("remember-me-button").should("be.visible")

    cy.getBySel("remember-me").should("be.visible")
  })

  it("should display a 'LOGIN' button", () => {
    cy.getBySel("login-button").should("be.visible")
  })

  it("should display a 'CREATE ACCOUNT' button", () => {
    cy.getBySel("register-button").should("be.visible")
  })

  it("should have focus set on then email field", () => {
    cy.getBySel("email").should("have.focus")
  })

  it("should display a password input field of type password", () => {
    cy.getBySel("password").should("be.visible")
  })
})
