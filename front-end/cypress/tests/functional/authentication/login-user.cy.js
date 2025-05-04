/// <reference types="cypress" />

import { clearLocalStorage } from "../../../support/utils"
const testuser = require("../../../fixtures/testuser.json")
const invalidCredentials = require("../../../fixtures/invalidCredentials.json")

describe("Authentication Section - Login User", () => {
  beforeEach(() => {
    clearLocalStorage()
    // Register test user
    cy.registerWithAPI()
    cy.visit("/")
  })

  // Functional tests

  // Positive tests

  it("should redirect to login page when user is not logged in", () => {
    // 1. Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("http://localhost:3000/")

    // 2. Check the app redirects to /account/login
    cy.step("Check the app redirects to /account/login")
    cy.url().should("include", "/account/login")

    // 3. Visit http://localhost:3000/todos/
    cy.step("Visit http://localhost:3000/todos/")
    cy.visit("http://localhost:3000/todos/")

    // 4. Check the app redirects to /account/login
    cy.step("Check the app redirects to /account/login")
    cy.url().should("include", "/account/login")

    // 5. Visit http://localhost:3000/dailies/
    cy.step("Visit http://localhost:3000/dailies/")
    cy.visit("http://localhost:3000/dailies/")

    // 6. Check the app redirects to /account/login
    cy.step("Check the app redirects to /account/login")
    cy.url().should("include", "/account/login")
  })

  it("should allow the user to login with valid credentials", () => {
    // 1.Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Enter email on email input
    cy.step("Enter email on email input")
    cy.getBySel("email").type(testuser.email)

    // 3. Enter password on password input
    cy.step("Enter password on password input")
    cy.getBySel("password").type(testuser.password)

    // 4. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 5. Check no error messages are shown
    cy.step("Check no error messages are shown")
    cy.getBySel("form-action-error").should("not.exist")

    // 6. Check the app redirects to http://localhost:3000/
    cy.step("Check the app redirects to http://localhost:3000/")
    cy.url().should("eq", "http://localhost:3000/")

    // 7. Check the login form is not visible
    cy.step("Check the login form is not visible")
    cy.getBySel("login-form").should("not.exist")

    // 8. Check the navbar is visible
    cy.step("Check the navbar is visible")
    cy.getBySel("navbar").should("be.visible")
  })

  it("should display a success message on login success", () => {
    // 1.Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Enter email on email input
    cy.step("Enter email on email")
    cy.getBySel("email").type(testuser.email)

    // 3. Enter password on password input
    cy.step("Enter password on password input")
    cy.getBySel("password").type(testuser.password)

    // 4. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 5. Check a success message with the text 'Login successful!' is displayed
    cy.step(
      "Check a success message with the text 'Login successful!' is displayed"
    )
    cy.getBySel("form-action-success")
      .should("be.visible")
      .and("contain.text", "Login successful!")
  })

  it("should allow the user to check a 'Remember Me' checkbox and have his email pre-written on the email input on next visit", () => {
    // 1.Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Enter email on email input
    cy.step("Enter email on email input")
    cy.getBySel("email").type(testuser.email)

    // 3. Enter password on password input
    cy.step("Enter password on password input")
    cy.getBySel("password").type(testuser.password)

    // 4. Check that 'remember me' button is not checked
    cy.step("Check that 'remember me' button is not checked")
    cy.step("Check the 'remember me' button")

    cy.getBySel("remember-me-button")
      .should("not.be.checked")
      // 5. Check the 'remember me' button
      .check()
      .should("be.checked")

    // 6. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 7. Click on navbar's 'Logout' link
    cy.step("Click on navbar's 'Logout' link")
    cy.getBySel("nav-link-logout").click()

    // 8. Check the email input has the email as value
    cy.step("Check the email input has the email as value")
    cy.getBySel("email").should("have.value", testuser.email)
  })

  it.skip("should persist user being logged in after page reload when 'Remember Me' checkbox is checked", () => {
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

  it("should not display the user's email on the email field when 'Remember Me' checkbox is unchecked", () => {
    // Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")

    // Uncheck 'remember me' button if it's checked
    cy.step("Uncheck 'remember me' button if it's checked")
    cy.getBySel("remember-me-button").uncheck()

    // Enter email on email input
    cy.step("Enter email on email input")
    cy.getBySel("email").type(testuser.email)

    // Enter password on password input
    cy.step("Enter password on password input")
    cy.getBySel("password").type(testuser.password)

    // Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // Click on navbar's 'Logout' link
    cy.step("Click on navbar's 'Logout' link")
    cy.getBySel("nav-link-logout").click()

    // Check the email input has "" as value
    cy.step('Check the email input has "" as value')
    cy.getBySel("email").should("have.value", "")
  })

  it("should keep user logged in when navigating the app when 'Remember Me' checkbox is unchecked", () => {
    // 1.Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Enter email on email input
    cy.step("Enter email on email input")
    cy.getBySel("email").type(testuser.email)

    // 3. Enter password on password input
    cy.step("Enter password on password input")
    cy.getBySel("password").type(testuser.password)

    // 4. Check that 'remember me' button is not checked
    cy.step("Check that 'remember me' button is not checked")
    cy.getBySel("remember-me-button").should("not.be.checked")

    // 5. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 6. Check the page redirects to http://localhost:3000/
    cy.step("Check the page redirects to http://localhost:3000/")
    cy.url().should("eq", "http://localhost:3000/")

    // 7. Click on 'Home' link on the navbar
    cy.step("Click on 'Home' link on the navbar")
    cy.contains("Home").click()

    // 8. Check the page redirects to http://localhost:3000/
    cy.step("Check the page redirects to http://localhost:3000/")
    cy.url().should("eq", "http://localhost:3000/")
  })

  it("should redirect to the 'Register User' form when 'CREATE ACCOUNT' button is clicked", () => {
    // 1.Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Click on 'CREATE ACCOUNT' button
    cy.step("Click on 'CREATE ACCOUNT' button")
    cy.getBySel("register-button").click()

    // 3. Check the page redirects to http://localhost:3000/account/register
    cy.step(
      "Check the page redirects to http://localhost:3000/account/register"
    )
    cy.url().should("include", "/account/register")
  })

  // Negative tests

  it("should not allow the user to login with invalid credentials", () => {
    // 1. Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Enter invalidEmail on email input
    cy.step("Enter invalidEmail on email input")
    cy.getBySel("email").type(invalidCredentials.invalidEmail)

    // 3. Enter invalidPassword on password input
    cy.step("Enter invalidPassword on password input")
    cy.getBySel("password").type(invalidCredentials.invalidPassword)

    // 4. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 5. Check that the current url is http://localhost:3000/account/login
    cy.step("Check that the current url is http://localhost:3000/account/login")
    cy.url().should("eq", "http://localhost:3000/account/login")

    // 6. Check that the login form is still visible
    cy.step("Check that the login form is still visible")
    cy.getBySel("login-form").should("be.visible")
  })

  it("should display an alert message when either email or password are invalid", () => {
    // 1. Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Enter invalidEmail on email input
    cy.step("Enter invalidEmail on email input")
    cy.getBySel("email").type(invalidCredentials.invalidEmail)

    // 3. Enter invalidPassword on password input
    cy.step("Enter invalidPassword on password input")
    cy.getBySel("password").type(invalidCredentials.invalidPassword)

    // 4. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 5. Check an error message with text 'Email or password invalid.' is visible
    cy.step(
      "Check an error message with text 'Email or password invalid.' is visible"
    )
    cy.getBySel("form-action-error")
      .should("be.visible")
      .and("have.text", "Email or password invalid.")
  })

  it("should display error label 'An email address is required.' when submitting an empty email address", () => {
    // 1. Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 3. Check an error label for the email field with the text 'An email address is required.' is visible
    cy.step(
      "Check an error label for the email field with the text 'An email address is required.' is visible"
    )
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("contain.text", "An email address is required.")
  })

  it("should display 'Email must be valid.' when submitting an invalid email address", () => {
    // 1. Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Enter invalidEmail on email input
    cy.step("Enter invalidEmail on email input")
    cy.getBySel("email").type(invalidCredentials.invalidEmail)

    // 3. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 4. Check an error label for the email field with the text 'Email must be valid.' is visible
    cy.step(
      "Check an error label for the email field with the text 'Email must be valid.' is visible"
    )
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("contain.text", "Email must be valid.")
  })

  it("should display error label 'Email must be at least 6 characters.' when submitting a shorter email address", () => {
    // 1. Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Enter shortEmail on email input
    cy.step("Enter shortEmail on email input")
    cy.getBySel("email").type(invalidCredentials.shortEmail)

    // 3. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 4. Check an error label for the email field with the text 'Email must be at least 6 characters.' is visible
    cy.step(
      "Check an error label for the email field with the text 'Email must be at least 6 characters.' is visible"
    )
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("contain.text", "Email must be at least 6 characters.")
  })

  it("should display error label 'Email must be shorter than 255 characters.' when submitting a longer email address", () => {
    // 1. Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Enter longEmail on email input
    cy.step("Enter longEmail on email input")
    cy.getBySel("email").type(invalidCredentials.longEmail)

    // 3. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 4. Check error label for the email field with the text 'Email must be shorter than 255 characters.' is visible
    cy.step(
      "Check error label for the email field with the text 'Email must be shorter than 255 characters.' is visible"
    )
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("contain.text", "Email must be shorter than 255 characters.")
  })

  it("should display error label 'A password is required.' when submitting an empty password", () => {
    // 1. Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 3. Check error label for the password field with the text 'A password is required.' is visible
    cy.step(
      "Check error label for the password field with the text 'A password is required.' is visible"
    )
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("contain.text", "A password is required.")
  })

  it("should display error label 'Password must be at least 8 characters.' when submitting a shorter password", () => {
    // 1. Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Enter shortPassword on password input
    cy.step("Enter shortPassword on password input")
    cy.getBySel("password").type(invalidCredentials.shortPassword)

    // 3. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 4. Check error label for the password field with the text 'Password must be at least 8 characters.' is visible
    cy.step(
      "Check error label for the password field with the text 'Password must be at least 8 characters.' is visible"
    )
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("contain.text", "Password must be at least 8 characters.")
  })

  it("should display error label 'Password must be less than 128 characters.' when submitting a longer password", () => {
    // 1. Visit http://localhost:3000/
    cy.step("Visit http://localhost:3000/")
    cy.visit("/")

    // 2. Enter longPassword on password input
    cy.step("Enter longPassword on password input")
    cy.getBySel("password").type(invalidCredentials.longPassword)

    // 3. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.getBySel("login-button").click()

    // 4. Check error label for the password field with the text 'Password must be less than 128 characters.' is visible
    cy.step(
      "Check error label for the password field with the text 'Password must be less than 128 characters.' is visible"
    )
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("contain.text", "Password must be less than 128 characters.")
  })

  afterEach(() => {
    cy.deleteTestUsers()
  })
})
