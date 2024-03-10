/// <reference types="cypress" />

const testuser = require("../../../fixtures/testuser.json")
import { clearLocalStorage } from "../../../support/utils"

describe("Authentication Section - Login User", () => {
  beforeEach(() => {
    clearLocalStorage()
    // Register test user
    cy.registerWithAPI()
    cy.visit("/")
  })

  // Functional tests

  // Positive tests

  it("should refirect to login page when user is not logged in", () => {
    // Check /accounts/login is the initial url shown
    cy.url().should("include", "/account/login")
  })

  it("should allow the user to login with valid credentials", () => {
    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(testuser.password)
    cy.getBySel("login-button").click()

    cy.getBySel("form-action-success")
      .should("be.visible")
      .and("contain.text", "Login successfull!")
    cy.getBySel("form-action-error").should("not.exist")

    cy.url().should("eq", "http://localhost:3000/")

    cy.getBySel("login-form").should("not.exist")
    cy.getBySel("navbar").should("be.visible")
  })

  it("should display a success message on login success", () => {
    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(testuser.password)
    cy.getBySel("login-button").click()

    cy.getBySel("form-action-success")
      .should("be.visible")
      .and("contain.text", "Login successfull!")
  })

  it("should allow the user to check a 'Remember Me' checkbox  and have his email pre-written on the email input on next visit", () => {
    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(testuser.password)
    cy.getBySel("remember-me-button")
      .should("not.be.checked")
      .check()
      .should("be.checked")
    cy.getBySel("login-button").click()
    cy.getBySel("nav-link-logout").click()
    cy.getBySel("email").should("have.value", testuser.email)
  })

  it("should persist user being logged in after page reload when 'Remember Me' checkbox is checked", () => {
    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(testuser.password)
    cy.getBySel("remember-me-button").check().should("be.checked")
    cy.getBySel("login-button").click()

    cy.getBySel("login-form").should("not.exist")
    cy.getBySel("navbar").should("be.visible")

    cy.reload()

    cy.getBySel("login-form").should("not.exist")
    cy.getBySel("navbar").should("be.visible")
  })

  it("should persist user being logged in after page reload when 'Remember Me' checkbox is not checked", () => {
    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(testuser.password)
    cy.getBySel("remember-me-button").should("not.be.checked")
    cy.getBySel("login-button").click()

    cy.getBySel("login-form").should("not.exist")
    cy.getBySel("navbar").should("be.visible")

    cy.reload()

    cy.getBySel("login-form").should("not.exist")
    cy.getBySel("navbar").should("be.visible")
  })

  it("should not display the user's email on the email field when'Remember Me' checkbox isn not checked", () => {
    cy.getBySel("remember-me-button").uncheck()

    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(testuser.password)
    cy.getBySel("login-button").click()
    cy.getBySel("nav-link-logout").click()
    cy.getBySel("email").should("have.value", "")
  })

  it("should redirect to the 'Register User' form when 'CREATE ACCOUNT' button is clicked", () => {
    cy.getBySel("register-button").click()

    cy.url().should("include", "/account/register")
  })

  // Negative tests

  it("should not allow the user to login with invalid credentials", () => {
    cy.getBySel("email").type("Invalid email")
    cy.getBySel("password").type("Invalid password")
    cy.getBySel("login-button").click()

    // Check login url and form are still displayed
    cy.url().should("eq", "http://localhost:3000/account/login")
    cy.getBySel("login-form").should("be.visible")
  })

  it("should display an alert message when either email or password are invalid", () => {
    // Leaving email and password empty
    cy.getBySel("login-button").click()
    cy.getBySel("form-action-error")
      .should("be.visible")
      .and("have.text", "Email or password invalid.")

    // Adding invalid(unregistered) email and password to inputs
    cy.getBySel("email").type("Unregistered email")
    cy.getBySel("password").type("Unregistered password")
    cy.getBySel("login-button").click()
  })

  it("should display error label 'An email address is required.' when submitting an empty email address", () => {
    cy.getBySel("login-button").click()
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("contain.text", "An email address is required.")
  })

  it("should display 'Email must be valid.' when submitting an invalid email address", () => {
    cy.getBySel("email").type("InvalidEmail")
    cy.getBySel("login-button").click()
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("contain.text", "Email must be valid.")
  })

  it("should display error label 'A password is required.' when submitting an empty password", () => {
    cy.getBySel("login-button").click()
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("contain.text", "A password is required.")
  })

  afterEach(() => {
    cy.deleteTestUsers()
  })
})
