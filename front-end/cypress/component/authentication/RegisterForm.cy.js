/// <reference types="cypress" />

import RegisterForm from "../../../src/forms/RegisterForm/RegisterForm"

describe("RegisterForm", () => {
  beforeEach(() => {
    cy.mount(<RegisterForm />)
  })

  it("should display an username input", () => {
    cy.getBySel("username")
      .should("be.visible")
      .and("have.attr", "placeholder")
      .and("contain", "Username")
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

  it("should display an password confirmation input", () => {
    cy.getBySel("password-confirmation")
      .should("be.visible")
      .and("have.attr", "placeholder")
      .and("contain", "Password confirmation")
  })

  it("should display a 'REGISTER' button", () => {
    cy.getBySel("register-button").should("be.visible")
  })

  it("should have focus set on then username field", () => {
    cy.getBySel("username").should("have.focus")
  })

  it("should display a password input field of type password", () => {
    cy.getBySel("password").should("be.visible")
  })

  it("should display a password confirmation input field of type password", () => {
    cy.getBySel("password-confirmation").should("be.visible")
  })

  it("display a 'Already have an account?' text and 'LOGIN' button that redirects to login page", () => {
    cy.getBySel("login-section")
      .should("be.visible")
      .and("contain.text", "Already have an account?")
    cy.getBySel("login-button").should("be.visible").click()

    cy.url().should("include", "/account/login")
  })
})
