/// <reference types="cypress" />

const testuser = require("../../../fixtures/testuser.json")
const invalidCredentials = require("../../../fixtures/invalidCredentials.json")

describe("Authentication Section - Login Smoke tests", () => {
  before(() => {
    cy.registerWithAPI()
    cy.visit("/")
  })

  // Positive tests

  it("should allow the user to login with valid credentials", () => {
    // Check alert error message
    cy.getBySel("login-button").click()

    //cy.get("body").matchImageSnapshot("Login Page Error Labels")

    cy.getBySel("form-action-error")
      .should("be.visible")
      .and("have.text", "Email or password invalid.")

    // Check required error labels
    cy.getBySel("email-error-label").should(
      "have.text",
      "An email address is required."
    )

    cy.getBySel("password-error-label").should(
      "have.text",
      "A password is required."
    )

    // Check email error labels
    cy.getBySel("email").type(invalidCredentials.invalidEmail)
    cy.getBySel("login-button").click()

    cy.getBySel("email-error-label").should("have.text", "Email must be valid.")

    cy.getBySel("email").clear().type(testuser.email)
    cy.getBySel("password").clear().type(testuser.password)
    cy.getBySel("login-button").click()

    cy.getBySel("form-action-success")
      .should("be.visible")
      .and("contain.text", "Login successfull!")
    cy.getBySel("form-action-error").should("not.exist")

    //cy.get("body").matchImageSnapshot("Login Page Login Success")

    cy.url().should("eq", "http://localhost:3000/")

    cy.getBySel("login-form").should("not.exist")
    cy.getBySel("navbar").should("be.visible")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
