/// <reference types="cypress" />

const testuser = require("../../../fixtures/testuser.json")
const unexistingUser = require("../../../fixtures/unexistingUser.json")

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

  it("should include the correct user properties in its response", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/login`,
      body: testuser,
      failOnStatusCode: false,
    }).then((res) => {
      const userData = res.body.data.find(
        (user) => user.email === testuser.email
      )
      expect(userData).to.haveOwnProperty("username", testuser.username)
      expect(userData).to.haveOwnProperty("email", testuser.email)
      expect(userData).to.haveOwnProperty("password")
    })
  })

  // Negative tests

  it("should not allow a user to log in with invalid (unexisting) data", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/login`,
      body: unexistingUser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq(
        `User ${unexistingUser.email} does not exists, register a user first!`
      )
    })
  })

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

  it("should respond with error message 'Password must be at least 8 characters.' when submitting a shorter password", () => {
    // Console.log all current users
    cy.request(`${apiUrl}/api/users`).then((res) => console.log(res.body.data))

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

  it("should respond with error message 'Password must be less than 128 characters.' when submitting a longer password", () => {
    const longPassword =
      "P@ssw0rd123!abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()"

    cy.request({
      method: "POST",
      url: `${apiUrl}/api/login`,
      body: {
        email: testuser.email,
        password: longPassword,
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq("Password must be less than 128 characters.")
    })
  })
})
