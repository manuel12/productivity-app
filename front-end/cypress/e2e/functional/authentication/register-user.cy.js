/// <reference types="cypress" />

const testuser = require("../../../fixtures/testuser.json")
const invalidCredentials = require("../../../fixtures/invalidCredentials.json")

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
    cy.getBySel("register-button").click()

    // After successful registration, user should be redirected to login
    cy.url().should("include", "/account/login")

    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(testuser.password)
    cy.getBySel("login-button").click()
  })

  it("should display a success message on register success", () => {
    // Enter valid registration details and submit the form
    cy.getBySel("username").type(testuser.username)
    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(testuser.password)
    cy.getBySel("password-confirmation").type(testuser.password)
    cy.getBySel("register-button").click()

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
    cy.getBySel("register-button").click()

    cy.visit("/account/register")

    // Enter valid registration details and submit the form
    cy.getBySel("username").type(testuser.username)
    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(testuser.password)
    cy.getBySel("password-confirmation").type(testuser.password)
    cy.getBySel("register-button").click()

    cy.getBySel("form-action-success").should("not.exist")

    cy.getBySel("form-action-error").should(
      "contain.text",
      `A user with email ${testuser.email} already exists!`
    )
  })

  it("should display an alert message when username, email, password or password confirmation are invalid", () => {
    cy.getBySel("register-button").click()

    cy.getBySel("form-action-error")
      .should("be.visible")
      .and("have.text", "Username, email or password invalid.")
  })

  it("should display error label 'A username is required.' when submitting empty username", () => {
    cy.getBySel("register-button").click()

    cy.getBySel("username-error-label").should(
      "have.text",
      "A username is required."
    )
  })

  it("should display error label 'Username must be at least 6 characters.' when submitting a shorter username", () => {
    cy.getBySel("username").type(invalidCredentials.shortUsername)
    cy.getBySel("register-button").click()

    cy.getBySel("username-error-label").should(
      "have.text",
      "Username must be at least 6 characters."
    )
  })

  it("should display error label 'Username must be shorter than 20 characters.' when submitting longer username", () => {
    cy.getBySel("username").type(invalidCredentials.longUsername)
    cy.getBySel("register-button").click()

    cy.getBySel("username-error-label").should(
      "have.text",
      "Username must be shorter than 20 characters."
    )
  })

  it("should display error label 'An email address is required.' when submitting empty email address", () => {
    cy.getBySel("register-button").click()

    cy.getBySel("email-error-label").should(
      "have.text",
      "An email address is required."
    )
  })

  it("should display error label 'Email must be at least 6 characters.' when submitting a shorter email address", () => {
    cy.getBySel("email").type(invalidCredentials.shortEmail)
    cy.getBySel("password").type("Testpass1!")
    cy.getBySel("register-button").click()
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("contain.text", "Email must be at least 6 characters.")
  })

  it("should display error label 'Email must be shorter than 255 characters.' when submitting a longer email address", () => {
    cy.getBySel("email").type(invalidCredentials.longEmail)
    cy.getBySel("password").type("Testpass1!")
    cy.getBySel("register-button").click()
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("contain.text", "Email must be shorter than 255 characters.")
  })

  it("should display error label 'Email address is invalid.' when submitting an invalid email address", () => {
    cy.getBySel("email").type(invalidCredentials.invalidEmail)
    cy.getBySel("register-button").click()

    cy.getBySel("email-error-label").should("have.text", "Email must be valid.")
  })

  it("should display error label 'A password is required.' appears submitting empty password", () => {
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "A password is required."
    )
  })

  it("should display error label 'Password must be at least 8 characters.' when submitting a shorter password", () => {
    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(invalidCredentials.shortPassword)
    cy.getBySel("register-button").click()
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("contain.text", "Password must be at least 8 characters.")
  })

  it("should display error label 'Password must be less than 128 characters.' when submitting a longer password", () => {
    cy.getBySel("password").type(invalidCredentials.longPassword)
    cy.getBySel("register-button").click()
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("contain.text", "Password must be less than 128 characters.")
  })

  it("should display error label 'A password confirmation is required.' when submitting empty password confirmation", () => {
    cy.getBySel("register-button").click()

    cy.getBySel("password-confirmation-error-label").should(
      "have.text",
      "A password confirmation is required."
    )
  })

  it("should display error label 'Passwords do not match.' when submitting incorrect password confirmation", () => {
    cy.getBySel("password").type(invalidCredentials.correctPassword1)
    cy.getBySel("password-confirmation").type(
      invalidCredentials.correctPassword2
    )

    cy.getBySel("register-button").click()

    cy.getBySel("password-confirmation-error-label").should(
      "have.text",
      "Passwords do not match."
    )
  })

  it("should display error label 'Password must be at least 8 characters.' when submitting a password without at least 8 characters", () => {
    cy.getBySel("password").type(invalidCredentials.shortPassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must be at least 8 characters."
    )
  })

  it("should display error label 'Password must contain at least 1 uppercase character.' when submitting a password without at least 1 uppercase character", () => {
    cy.getBySel("password").type(invalidCredentials.noUppercasePassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 uppercase character."
    )
  })

  it("should display error label 'Password must contain at least 1 lowercase character.' when submitting a password without at least 1 lowercase", () => {
    cy.getBySel("password").type(invalidCredentials.noLowercasePassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 lowercase character."
    )
  })

  it("should display error label 'Password must contain at least 1 number character.' when submitting a password without at least 1 number character", () => {
    cy.getBySel("password").type(invalidCredentials.noNumberPassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 number character."
    )
  })

  it("should display error label 'Password must contain at least 1 special character.' when submitting a password without at least 1 special character", () => {
    cy.getBySel("password").type(invalidCredentials.noSpecialCharPassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 special character."
    )
  })

  afterEach(() => {
    cy.deleteTestUsers()
  })
})
