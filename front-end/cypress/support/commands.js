// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const apiUrl = "http://localhost:4000"
const testuser = require("../../cypress/fixtures/testuser.json")

Cypress.Commands.add("getBySel", (selector) => {
  cy.get(`[data-cy=${selector}]`)
})

// -- LOGIN COMMANDS --
Cypress.Commands.add("login", () => {
  cy.url().then((url) => {
    const isLoggedIn = url === Cypress.config("contentsUrl")

    if (isLoggedIn) {
      cy.log("Already logged in...")
    } else {
      cy.log("Logging in...")

      cy.getBySel("user-email").type(testuser.email)
      cy.getBySel("user-password").type(testuser.password)
      cy.getBySel("remember-me-button").click()
      cy.getBySel("login-button").click()
    }
  })
})

Cypress.Commands.add("register", () => {
  cy.visit("/account/register")

  cy.getBySel("username").type(testuser.username)
  cy.getBySel("email").type(testuser.email)
  cy.getBySel("password").type(testuser.password)
  cy.getBySel("password-confirmation").type(testuser.password)
  cy.getBySel("register-button").click()
})

Cypress.Commands.add("registerWithAPI", () => {
  cy.request("POST", `${apiUrl}/api/user/`, {
    username: testuser.username,
    email: testuser.email,
    password: testuser.password,
  })
})

Cypress.Commands.add("deleteTestUsers", () => {
  return cy
    .request({
      method: "DELETE",
      url: `${apiUrl}/api/users/delete-test-users/`,
    })
    .then((res) => {
      expect(res.status).to.eq(204)
    })
})

Cypress.Commands.add("deleteTestTodos", (token) => {
  cy.request({
    method: "DELETE",
    url: "http://localhost:4000/api/todos/delete-test-todos/",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
  }).then((res) => {
    expect(res.status).to.eq(204)
  })
})

Cypress.Commands.add("deleteTestDailies", () => {
  cy.request({
    method: "DELETE",
    url: "http://localhost:4000/api/dailies/delete-test-dailies/",
  }).then((res) => expect(res.status).to.eq(204))
})
