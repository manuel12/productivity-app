/// <reference types="cypress" />

const testuser = require("../../../fixtures/testuser.json")

describe("Authentication Section - Login User", () => {
  beforeEach(() => {
    // Register test user
    cy.registerWithAPI()
    cy.visit("/")
  })

  // Functional tests

  // Positive tests

  it("should refirect to login page when user is not logged in", () => {
    // Check /accounts/login is the initial url shown
    cy.url().should("include", "/account/login")

    // Visit /contents
    cy.visit("/contents")

    // Check /accounts/login is the initial url shown
    cy.url().should("include", "/account/login")

    // Visit /contents
    cy.visit("/projects")

    // Check /accounts/login is the initial url shown
    cy.url().should("include", "/account/login")

    // Visit /tasks
    cy.visit("/tasks")

    // Check /accounts/login is the initial url shown
    cy.url().should("include", "/account/login")
  })

  it("should allow the user to login with valid credentials", () => {
    cy.get("input[name='email']").type(testuser.email)
    cy.get("input[name='password']").type(testuser.password)
    cy.get("button[type='submit']").click()

    cy.get("[data-cy=form-action-success")
      .should("be.visible")
      .and("contain.text", "Login successfull!")
    cy.get("[data-cy=form-action-error]").should("not.exist")

    cy.url().should("eq", "http://localhost:3000/")

    cy.get("[data-cy=login-form]").should("not.exist")
    cy.get("[data-cy=navbar]").should("be.visible")
  })

  it("should display a success message on login success", () => {
    cy.get("input[name='email']").type(testuser.email)
    cy.get("input[name='password']").type(testuser.password)
    cy.get("button[type='submit']").click()

    cy.get("[data-cy=form-action-success")
      .should("be.visible")
      .and("contain.text", "Login successfull!")
  })

  it("should allow the user to check a 'Remember Me' button and have his email pre-written on the email input on next visit", () => {
    cy.get("input[name='email']").type(testuser.email)
    cy.get("input[name='password']").type(testuser.password)
    cy.get("input[type='checkbox']")
      .should("not.be.checked")
      .check()
      .should("be.checked")
    cy.get("button[type='submit']").click()
    cy.get("[data-cy=nav-link-logout]").click()
    cy.get("input[name='email']").should("have.value", testuser.email)
  })

  it("should not display the user's email on the email field when'Remember Me' checkbox isn not checked", () => {
    cy.get("input[type='checkbox']").uncheck()

    cy.get("input[name='email']").type(testuser.email)
    cy.get("input[name='password']").type(testuser.password)
    cy.get("button[type='submit']").click()
    cy.get("[data-cy=nav-link-logout]").click()
    cy.get("input[name='email']").should("have.value", "")
  })

  it("should redirect to the 'Register User' form when CREATE ACCOUNT button is clicked", () => {
    cy.get("[data-cy=register-link]").click()

    cy.url().should("include", "/account/register")
  })

  // Negative tests

  it("should not allow the user to login with invalid credentials", () => {
    cy.get("input[name='email']").type("Invalid email")
    cy.get("input[name='password']").type("Invalid password")
    cy.get("button[type='submit']").click()

    // Check login url and form are still displayed
    cy.url().should("eq", "http://localhost:3000/account/login")
    cy.get("[data-cy='login-form']").should("be.visible")
  })

  it("should display an alert message when either email or password are invalid", () => {
    // Leaving email and password empty
    cy.get("button[type='submit']").click()
    cy.get("[data-cy=form-action-error]")
      .should("be.visible")
      .and("have.text", "Email or password invalid.")

    // Adding invalid(unregistered) email and password to inputs
    cy.get("input[name='email']").type("Unregistered email")
    cy.get("input[name='password']").type("Unregistered password")
    cy.get("button[type='submit']").click()
  })

  it("should display error label 'An email address is required.' when submitting an empty email address", () => {
    cy.get("button[type='submit']").click()
    cy.get('[data-cy="email-error-label"]')
      .should("be.visible")
      .and("contain.text", "An email address is required.")
  })

  it("should display error label 'A password is required.' when submitting an empty password", () => {
    cy.get("button[type='submit']").click()
    cy.get('[data-cy="password-error-label"]')
      .should("be.visible")
      .and("contain.text", "A password is required.")
  })

  afterEach(() => {
    cy.deleteTestUsers()
  })
})
