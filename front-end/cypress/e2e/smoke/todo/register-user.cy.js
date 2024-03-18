/// <reference types="cypress" />

const testuser = require("../../../fixtures/testuser.json")
const invalidCredentials = require("../../../fixtures/invalidCredentials.json")

describe("Authentication Section - Register Smoke tests", () => {
  before(() => {
    cy.deleteTestUsers()
    cy.visit("/")
  })

  // Positive tests

  it("should allow the user to register with valid credentials", () => {
    cy.getBySel("register-button").click()

    // Check alert error message
    cy.getBySel("register-button").click()

    //cy.get("body").matchImageSnapshot("Register Page Error Labels")

    cy.getBySel("form-action-error")
      .should("be.visible")
      .and("have.text", "Username, email or password invalid.")

    // Check required error labels
    cy.getBySel("username-error-label").should(
      "have.text",
      "A username is required."
    )

    cy.getBySel("email-error-label").should(
      "have.text",
      "An email address is required."
    )

    cy.getBySel("password-error-label").should(
      "have.text",
      "A password is required."
    )

    cy.getBySel("password-confirmation-error-label").should(
      "have.text",
      "A password confirmation is required."
    )

    // Check username error labels
    cy.getBySel("username").type(invalidCredentials.shortUsername)
    cy.getBySel("register-button").click()

    cy.getBySel("username-error-label").should(
      "have.text",
      "Username must be at least 6 characters."
    )

    // Check email error labels
    cy.getBySel("email").type(invalidCredentials.invalidEmail)
    cy.getBySel("register-button").click()

    cy.getBySel("email-error-label").should("have.text", "Email must be valid.")

    // Check password error labels
    cy.getBySel("password").clear().type(invalidCredentials.shortPassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must be at least 8 characters."
    )

    cy.getBySel("password").clear().type(invalidCredentials.noUppercasePassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 uppercase character."
    )

    cy.getBySel("password").clear().type(invalidCredentials.noLowercasePassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 lowercase character."
    )

    cy.getBySel("password").clear().type(invalidCredentials.noNumberPassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 number character."
    )

    cy.getBySel("password")
      .clear()
      .type(invalidCredentials.noSpecialCharPassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 special character."
    )

    // Check password confirmation error labels
    cy.getBySel("password").clear().type(invalidCredentials.correctPassword1)
    cy.getBySel("password-confirmation").type(
      invalidCredentials.correctPassword2
    )

    cy.getBySel("register-button").click()

    cy.getBySel("password-confirmation-error-label").should(
      "have.text",
      "Passwords do not match."
    )

    // Enter valid registration details and submit the form
    cy.getBySel("username").clear().type(testuser.username)
    cy.getBySel("email").clear().type(testuser.email)
    cy.getBySel("password").clear().type(testuser.password)
    cy.getBySel("password-confirmation").clear().type(testuser.password)
    cy.getBySel("register-button").click()

    // Check alert success message
    cy.getBySel("form-action-success")
      .should("be.visible")
      .and("have.text", `User ${testuser.email} successfully registered!`)

    //cy.get("body").matchImageSnapshot("Register Page Register Success")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
