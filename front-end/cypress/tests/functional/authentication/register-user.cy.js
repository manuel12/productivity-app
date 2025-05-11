/// <reference types="cypress" />

const userData = require("../../../fixtures/users/userData.json")
const testuser = userData.validData
const invalidCredentials = userData.invalidData

describe("Authentication Section - Register User", () => {
  beforeEach(() => {
    // Cleanup
    cy.deleteTestUsers()

    cy.visit("/account/register")
  })

  // Functional tests

  // Positive tests

  it("should allow the user to register with valid credentials", () => {
    // 1. Enter username on username input
    cy.step("Enter username on username input")
    cy.getBySel("username").type(testuser.username)

    // 2. Enter email on email input
    cy.step("Enter email on email input")
    cy.getBySel("email").type(testuser.email)

    // 3. Enter password on password input
    cy.step("Enter password on password input")
    cy.getBySel("password").type(testuser.password)

    // 4. Enter passwordConfirmation on password confirmation input
    cy.step("Enter passwordConfirmation on password confirmation input")
    cy.getBySel("password-confirmation").type(testuser.password)

    // 5. Click 'REGISTER' button
    cy.step("Click 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 6. Check you are redirected to http://localhost:3000/account/login/
    cy.step("Check you are redirected to http://localhost:3000/account/login/")
    cy.url().should("include", "/account/login")

    // 7. Enter email on email input
    cy.step("Enter email on email input")
    cy.getBySel("email").type(testuser.email)

    // 8. Enter password on password input
    cy.step("Enter password on password input")
    cy.getBySel("password").type(testuser.password)

    // 9. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 10. Check that page redirects to http://localhost:3000/
    cy.step("Check that page redirects to http://localhost:3000/")
    cy.url().should("eq", "http://localhost:3000/")
  })

  it("should display a success message on register success", () => {
    // 1. Visit http://localhost:3000/account/register/
    cy.step("Visit http://localhost:3000/account/register/")
    cy.visit("http://localhost:3000/account/register/")

    // 2. Enter username on username input
    cy.step("Enter username on username input")
    cy.getBySel("username").type(testuser.username)

    // 3. Enter email on email input
    cy.step("Enter email on email input")
    cy.getBySel("email").type(testuser.email)

    // 4. Enter password on password input
    cy.step("Enter password on password input")
    cy.getBySel("password").type(testuser.password)

    // 5. Enter passwordConfirmation on password confirmation input
    cy.step("Enter passwordConfirmation on password confirmation input")
    cy.getBySel("password-confirmation").type(testuser.password)

    // 6. Click 'REGISTER' button
    cy.step("Click 'REGISTER' button")
    cy.getBySel("register-button").click()

    //7. Check alert message with the text 'User testuser1@gmail.com successfully registered!' is visible
    cy.step(
      "Check alert message with the text 'User testuser1@gmail.com successfully registered!' is visible"
    )
    cy.getBySel("form-action-success")
      .should("be.visible")
      .and("contain.text", `User ${testuser.email} successfully registered!`)
  })

  // Negative tests

  it("should not allow user to register with existing credentials", () => {
    // 1. Enter username on username input
    cy.step("Enter username on username input")
    cy.getBySel("username").type(testuser.username)

    // 2. Enter email on email input
    cy.step("Enter email on email input")
    cy.getBySel("email").type(testuser.email)

    // 3. Enter password on password input
    cy.step("Enter password on password input")
    cy.getBySel("password").type(testuser.password)

    // 4. Enter passwordConfirmation on password confirmation input
    cy.step("Enter passwordConfirmation on password confirmation input")
    cy.getBySel("password-confirmation").type(testuser.password)

    // 5. Click 'REGISTER' button
    cy.step("Click 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 6. Visit http://localhost:3000/account/register/
    cy.step("Visit http://localhost:3000/account/register/")
    cy.visit("/account/register")

    // 7. Enter username on username input
    cy.step("Enter username on username input")
    cy.getBySel("username").type(testuser.username)

    // 8. Enter email on email input
    cy.step("Enter email on email input")
    cy.getBySel("email").type(testuser.email)

    // 9. Enter password on password input
    cy.step("Enter password on password input")
    cy.getBySel("password").type(testuser.password)

    // 10. Enter passwordConfirmation on password confirmation input
    cy.step("Enter passwordConfirmation on password confirmation input")
    cy.getBySel("password-confirmation").type(testuser.password)

    // 11. Click 'REGISTER' button
    cy.step("Click 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 12. Check alert message with the text 'A user with testuser1@gmail.com already exists!' is visible
    cy.step(
      "Check alert message with the text 'A user with testuser1@gmail.com already exists!' is visible"
    )
    cy.getBySel("form-action-success").should("not.exist")

    // 13. Check no success alert message is visible
    cy.step("Check no success alert message is visible")
    cy.getBySel("form-action-error").should(
      "contain.text",
      `A user with email ${testuser.email} already exists!`
    )
  })

  it("should display an alert message when username, email, password or password confirmation are invalid", () => {
    // 1. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 2. Check alert message with the text 'Username, email or password invalid.' is visible
    cy.step(
      "Check alert message with the text 'Username, email or password invalid.' is visible"
    )
    cy.getBySel("form-action-error")
      .should("be.visible")
      .and("have.text", "Username, email or password invalid.")
  })

  it("should display error label 'A username is required.' when submitting empty username", () => {
    // 1. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 2. Check an error label for the username field with the text 'A username is required.' is visible
    cy.step(
      "Check an error label for the username field with the text 'A username is required.' is visible"
    )
    cy.getBySel("username-error-label").should(
      "have.text",
      "A username is required."
    )
  })

  it("should display error label 'Username must be at least 6 characters.' when submitting a shorter username", () => {
    // 1. Enter username on username input in the username field
    cy.step("Enter username on username input in the username field")
    cy.getBySel("username").type(invalidCredentials.usernameShoterThan6Chars)

    // 2. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 3. Check an error label for the username field with the text 'Username must be at least 6 characters.' is visible
    cy.step(
      "Check an error label for the username field with the text 'Username must be at least 6 characters.' is visible"
    )
    cy.getBySel("username-error-label").should(
      "have.text",
      "Username must be at least 6 characters."
    )
  })

  it("should display error label 'Username must be shorter than 20 characters.' when submitting longer username", () => {
    // 1. Enter username on username input  in the username field
    cy.step("Enter username on username input  in the username field")
    cy.getBySel("username").type(invalidCredentials.usernameLongerThan20Chars)

    // 2. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 3. Check an error label for the username field with the text 'Username must be shorter than 20 characters.' is visible
    cy.step(
      "Check an error label for the username field with the text 'Username must be shorter than 20 characters.' is visible"
    )
    cy.getBySel("username-error-label").should(
      "have.text",
      "Username must be shorter than 20 characters."
    )
  })

  it("should display error label 'An email address is required.' when submitting empty email address", () => {
    // 1. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 2. Check an error label for the email field with the text 'An email address is required.' is visible
    cy.step(
      "Check an error label for the email field with the text 'An email address is required.' is visible"
    )
    cy.getBySel("email-error-label").should(
      "have.text",
      "An email address is required."
    )
  })

  it("should display error label 'Email address is invalid.' when submitting an invalid email address", () => {
    // 1. Enter invalidEmail in the email field
    cy.step("Enter invalidEmail in the email field")
    cy.getBySel("email").type(invalidCredentials.invalidEmail)

    // 2. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 3. Check an error label for the email field with the text 'Email must be valid.' is visible
    cy.step(
      "Check an error label for the email field with the text 'Email must be valid.' is visible"
    )
    cy.getBySel("email-error-label").should("have.text", "Email must be valid.")
  })

  it("should display error label 'Email must be at least 6 characters.' when submitting a shorter email address", () => {
    // 1. Enter email on email input in the email field
    cy.step("Enter email on email input in the email field")
    cy.getBySel("email").type(invalidCredentials.emailShorterThan6Chars)

    // 2. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 3. Check an error label for the email field with the text 'Email must be at least 6 characters.' is visible
    cy.step(
      "Check an error label for the email field with the text 'Email must be at least 6 characters.' is visible"
    )
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("contain.text", "Email must be at least 6 characters.")
  })

  it("should display error label 'Email must be shorter than 255 characters.' when submitting a longer email address", () => {
    // 1. Enter emailLongerThan255Chars in the email field
    cy.step("Enter emailLongerThan255Chars in the email field")
    cy.getBySel("email").type(invalidCredentials.emailLongerThan255Chars)

    // 2. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 3. Check an error label for the email field with the text 'Email must be shorter than 255 characters.' is visible
    cy.step(
      "Check an error label for the email field with the text 'Email must be shorter than 255 characters.' is visible"
    )
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("contain.text", "Email must be shorter than 255 characters.")
  })

  it("should display error label 'A password is required.' appears submitting empty password", () => {
    // 1. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 2. Check an error label for the password field with the text 'A password is required.' is visible
    cy.step(
      "Check an error label for the password field with the text 'A password is required.' is visible"
    )
    cy.getBySel("password-error-label").should(
      "have.text",
      "A password is required."
    )
  })

  it("should display error label 'Password must be at least 8 characters.' when submitting a shorter password", () => {
    cy.getBySel("email").type(testuser.email)
    cy.getBySel("password").type(invalidCredentials.passwordShorterThan8Chars)
    cy.getBySel("register-button").click()
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("contain.text", "Password must be at least 8 characters.")
  })

  it("should display error label 'Password must be less than 128 characters.' when submitting a longer password", () => {
    cy.getBySel("password").type(invalidCredentials.passwordLongerThan128Chars)
    cy.getBySel("register-button").click()
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("contain.text", "Password must be less than 128 characters.")
  })

  it("should display error label 'A password confirmation is required.' when submitting empty password confirmation", () => {
    // 1. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 2. Check an error label for the password confirmation field with the text 'A password confirmation is required.' is visible
    cy.step(
      "Check an error label for the password confirmation field with the text 'A password confirmation is required.' is visible"
    )
    cy.getBySel("password-confirmation-error-label").should(
      "have.text",
      "A password confirmation is required."
    )
  })

  it("should display error label 'Passwords do not match.' when submitting incorrect password confirmation", () => {
    // 1. Enter password on password input
    cy.step("Enter password on password input")
    cy.getBySel("password").type(invalidCredentials.noMatchPassword1)

    // 2. Enter passwordConfirmation on password confirmation input
    cy.step("Enter passwordConfirmation on password confirmation input")
    cy.getBySel("password-confirmation").type(
      invalidCredentials.noMatchPassword2
    )
    // 3. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 4. Check an error label for the password confirmation field with the text 'Passwords do not match.' is visible
    cy.step(
      "Check an error label for the password confirmation field with the text 'Passwords do not match.' is visible"
    )
    cy.getBySel("password-confirmation-error-label").should(
      "have.text",
      "Passwords do not match."
    )
  })

  it("should display error label 'Password must be at least 8 characters.' when submitting a password without at least 8 characters", () => {
    // 1. Enter passwordShorterThan8Chars in the password field
    cy.step("Enter passwordShorterThan8Chars in the password field")
    cy.getBySel("password").type(invalidCredentials.passwordShorterThan8Chars)

    // 2. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 3. Check an error label for the password field with the text 'Password must be at least 8 characters.' is visible
    cy.step(
      "Check an error label for the password field with the text 'Password must be at least 8 characters.' is visible"
    )
    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must be at least 8 characters."
    )
  })

  it("should display error label 'Password must contain at least 1 uppercase character.' when submitting a password without at least 1 uppercase character", () => {
    // 1. Enter invalidPassword on password field
    cy.step("Enter invalidPassword on password field")
    cy.getBySel("password").type(invalidCredentials.noUppercasePassword)

    // 2. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 3. Check an error label for the password field with the text 'Password must contain at least 1 uppercase character.' is visible
    cy.step(
      "Check an error label for the password field with the text 'Password must contain at least 1 uppercase character.' is visible"
    )
    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 uppercase character."
    )
  })

  it("should display error label 'Password must contain at least 1 lowercase character.' when submitting a password without at least 1 lowercase character", () => {
    // 1. Enter invalidPassword on password field
    cy.step("Enter invalidPassword on password field")
    cy.getBySel("password").type(invalidCredentials.noLowercasePassword)

    // 2. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 3. Check error label for the password field with the text 'Password must contain at least 1 lowercase character.' is visible
    cy.step(
      "Check error label for the password field with the text 'Password must contain at least 1 lowercase character.' is visible"
    )
    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 lowercase character."
    )
  })

  it("should display error label 'Password must contain at least 1 number character.' when submitting a password without at least 1 number character", () => {
    // 1. Enter invalidPassword on password field
    cy.step("Enter invalidPassword on password field")
    cy.getBySel("password").type(invalidCredentials.noNumberPassword)

    // 2. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 3. Check error label for the password field with the text 'Password must contain at least 1 number character.' is visible
    cy.step(
      "Check error label for the password field with the text 'Password must contain at least 1 number character.' is visible"
    )
    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 number character."
    )
  })

  it("should display error label 'Password must contain at least 1 special character.' when submitting a password without at least 1 special character", () => {
    // 1. Enter invalidPassword on password field
    cy.step("Enter invalidPassword on password field")
    cy.getBySel("password").type(invalidCredentials.noSpecialCharPassword)

    // 2. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.getBySel("register-button").click()

    // 3. Check error label for the password field with the text 'Password must contain at least 1 special character.' is visible
    cy.step(
      "Check error label for the password field with the text 'Password must contain at least 1 special character.' is visible"
    )
    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 special character."
    )
  })
})
