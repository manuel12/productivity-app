/// <reference types="cypress" />

const testuser = require("../../../fixtures/testuser.json")

describe("Authentication Section - Register User", () => {
  beforeEach(() => {
    cy.visit("/account/register")
  })

  // Functional tests

  // Positive tests

  it("should allow the user to register with valid credentials", () => {
    // Enter valid registration details and submit the form
    cy.getBySel("username").type(testuser.username)
    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(testuser.password)
    cy.getBySel("password-confirmation").type(testuser.password)
    cy.get("button[type='submit']").click()

    // After successful registration, user should be redirected to login
    cy.url().should("include", "/account/login")

    cy.getBySel("user-email").type(testuser.email)
    cy.getBySel("user-password").type(testuser.password)
    cy.getBySel("login-button").click()
  })

  it("should display a success message on register success", () => {
    // Enter valid registration details and submit the form
    cy.getBySel("username").type(testuser.username)
    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(testuser.password)
    cy.getBySel("password-confirmation").type(testuser.password)
    cy.get("button[type='submit']").click()

    cy.getBySel("form-action-success")
      .should("be.visible")
      .and("contain.text", `User ${testuser.email} successfully registered!`)
  })

  // Negative tests

  it("should not allow user to register with existing credentials", () => {
    // Enter valid registration details and submit the form
    cy.getBySel("username").type(testuser.username)
    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(testuser.password)
    cy.getBySel("password-confirmation").type(testuser.password)
    cy.get("button[type='submit']").click()

    cy.visit("/account/register")

    // Enter valid registration details and submit the form
    cy.getBySel("username").type(testuser.username)
    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(testuser.password)
    cy.getBySel("password-confirmation").type(testuser.password)
    cy.get("button[type='submit']").click()

    cy.getBySel("form-action-success").should("not.exist")

    cy.getBySel("form-action-error").should(
      "contain.text",
      `A user with email ${testuser.email} already exists!`
    )
  })

  afterEach(() => {
    cy.deleteTestUsers()
  })
})
