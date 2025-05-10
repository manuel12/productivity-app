/// <reference types="cypress" />

const testuser = require("../../../fixtures/users/testuser.json")
const invalidTestuser = require("../../../fixtures/users/invalidCredentials.json")
const unexistingUser = require("../../../fixtures/users/unexistingUser.json")

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
      const userData = res.body.data
      expect(userData).to.haveOwnProperty("id")
      expect(userData).to.haveOwnProperty("username", testuser.username)
      expect(userData).to.haveOwnProperty("email", testuser.email)
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
        `User ${unexistingUser.email} does not exist, register a user first!`
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

  it("should respond with error message 'Email must be at least 6 characters.' when submitting a shorter email address", () => {
    const testUser = {
      username: testuser.username,
      email: invalidTestuser.emailShorterThan6Chars,
      password: testuser.password,
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

  it("should respond with error message 'Email must be shorter than 255 characters.' when submitting a longer email address", () => {
    const testUser = {
      username: testuser.username,
      email: invalidTestuser.emailLongerThan255Chars,
      password: testuser.password,
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

  it("should respond with error message 'Password must be at least 8 characters.' when submitting a shorter password", () => {
    // Console.log all current users
    cy.request(`${apiUrl}/api/users`).then((res) => console.log(res.body.data))

    const testUser = {
      username: testuser.username,
      email: testuser.email,
      password: invalidTestuser.passwordShorterThan8Chars,
    }

    cy.request({
      method: "POST",
      url: `${apiUrl}/api/login`,
      body: testUser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq("Password must be at least 8 characters.")
    })
  })

  it("should respond with error message 'Password must be less than 128 characters.' when submitting a longer password", () => {
    const testUser = {
      username: testuser.username,
      email: testuser.email,
      password: invalidTestuser.passwordLongerThan128Chars,
    }

    cy.request({
      method: "POST",
      url: `${apiUrl}/api/login`,
      body: testUser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq("Password must be less than 128 characters.")
    })
  })
})
