/// <reference types="cypress" />

import { qase } from "cypress-qase-reporter/mocha"

const testuser = require("../../../../fixtures/testuser.json")
const unexistingUser = require("../../../../fixtures/unexistingUser.json")

describe("LOGIN User - (POST) /api/login", () => {
  const apiUrl = "http://localhost:4000"

  beforeEach(() => {
    // Delete all db records
    cy.deleteTestUsers()
    // Register user
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user/`,
      body: testuser,
    }).then((res) => {
      expect(res.status).to.eq(201)
    })
  })

  // Positive tests

  // POST - /api/login loginUser

  qase(
    79,
    it("should allow a user to log in with valid (existing) data", () => {
      cy.request({
        method: "POST",
        url: `${apiUrl}/api/login`,
        body: testuser,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(200)
      })
    })
  )

  qase(
    80,
    it("should include a success message in its response", () => {
      cy.request({
        method: "POST",
        url: `${apiUrl}/api/login`,
        body: testuser,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body.message).to.eq("User successfully logged in!")
      })
    })
  )

  qase(
    81,
    it("should include the correct user properties in its response", () => {
      cy.request({
        method: "POST",
        url: `${apiUrl}/api/login`,
        body: testuser,
        failOnStatusCode: false,
      }).then((res) => {
        const userData = res.body.data
        expect(userData).to.haveOwnProperty("id")
        expect(userData).to.haveOwnProperty("username", testuser.username)
        expect(userData).to.haveOwnProperty("email", testuser.email)
      })
    })
  )

  // Negative tests

  qase(
    82,
    it("should not allow a user to log in with invalid (unexisting) data", () => {
      cy.request({
        method: "POST",
        url: `${apiUrl}/api/login`,
        body: unexistingUser,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body.error).to.eq(
          `User ${unexistingUser.email} does not exist, register a user first!`
        )
      })
    })
  )

  qase(
    83,
    it("should not allow a user to log in with empty data", () => {
      cy.request({
        method: "POST",
        url: `${apiUrl}/api/login`,
        body: {},
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400)
      })
    })
  )

  qase(
    84,
    it("should respond with a message indicating any missing credentials", () => {
      cy.request({
        method: "POST",
        url: `${apiUrl}/api/login`,
        body: {},
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body.error).to.eq(
          "No email (string) specified, No password (string) specified."
        )
      })
    })
  )

  qase(
    85,
    it("should respond with error message 'Email must be at least 6 characters.' when submitting a shorter email address", () => {
      const testUser = {
        username: "testuser1",
        email: "a@ade",
        password: "Testpass1!",
      }

      cy.request({
        method: "POST",
        url: "http://localhost:4000/api/login",
        body: testUser,
        failOnStatusCode: false, // Allow non-2xx responses
      }).then((response) => {
        expect(response.status).to.eq(400) // Or the appropriate error status code
        expect(response.body).to.have.property(
          "error",
          "Email must be at least 6 characters."
        )
      })
    })
  )

  qase(
    86,
    it("should respond with error message 'Email must be shorter than 255 characters.' when submitting a longer email address", () => {
      const testUser = {
        username: "testuser1",
        email:
          "P@ssw0rd123!abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()P@ssw0rd123!abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()",
        password: "Testpass1!",
      }

      cy.request({
        method: "POST",
        url: "http://localhost:4000/api/login",
        body: testUser,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400) // Or the appropriate error status code
        expect(response.body).to.have.property(
          "error",
          "Email must be shorter than 255 characters."
        )
      })
    })
  )

  qase(
    87,
    it("should respond with error message 'Password must be at least 8 characters.' when submitting a shorter password", () => {
      // Console.log all current users
      cy.request(`${apiUrl}/api/users`).then((res) =>
        console.log(res.body.data)
      )

      cy.request({
        method: "POST",
        url: `${apiUrl}/api/login`,
        body: {
          email: testuser.email,
          password: "Pass1!",
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body.error).to.eq("Password must be at least 8 characters.")
      })
    })
  )

  qase(
    88,
    it("should respond with error message 'Password must be less than 128 characters.' when submitting a longer password", () => {
      const passwordLongerThan128Chars =
        "P@ssw0rd123!abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()"

      cy.request({
        method: "POST",
        url: `${apiUrl}/api/login`,
        body: {
          email: testuser.email,
          password: passwordLongerThan128Chars,
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body.error).to.eq(
          "Password must be less than 128 characters."
        )
      })
    })
  )
})
