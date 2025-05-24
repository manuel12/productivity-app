/// <reference types="cypress" />

const testuser = require("../../../fixtures/users/testuser.json")
const invalidTestuser = require("../../../fixtures/users/invalidCredentials.json")

describe("REGISTER User - (POST) /api/user", () => {
  const apiUrl = "http://localhost:4000"

  beforeEach(() => {
    // Delete all db records
    cy.deleteTestUsers()
  })

  // Positive tests

  // POST - /api/user/ registerUser"
  it("should allow a user to register with valid data", () => {
    // Register credentials
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user/`,
      body: testuser,
    }).then((res) => {
      expect(res.status).to.eq(201)
    })
  })

  it("should respond with a success message when registering user", () => {
    // Register credentials
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user/`,
      body: testuser,
    }).then((res) => {
      expect(res.body.message).to.eq(
        `User ${testuser.email} successfully registered!`
      )
    })
  })

  it("should respond with the correct properties for the registered user", () => {
    // Register credentials
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user/`,
      body: testuser,
    }).then((res) => {
      const userData = res.body.data
      expect(userData).to.haveOwnProperty("id")
      expect(userData).to.haveOwnProperty("username", testuser.username)
      expect(userData).to.haveOwnProperty("email", testuser.email)
    })
  })

  // Negative tests

  // POST - /api/user/ registerUser"
  it("should not allow a user to register with invalid (existing) data", () => {
    // Register credentials
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user/`,
      body: testuser,
    }).then((res) => {
      expect(res.body.message).to.eq(
        `User ${testuser.email} successfully registered!`
      )
    })

    // Register credentials again.
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user/`,
      body: testuser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq(
        `A user with email ${testuser.email} already exists!`
      )
    })
  })

  it("should not allow a user to register with empty data", () => {
    // Register credentials
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user/`,
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400)
    })
  })

  it("should respond with a message indicating any missing credentials", () => {
    // Register credentials
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user/`,
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq(
        "No username (string) specified, No email (string) specified, No password (string) specified."
      )
    })
  })

  it("should respond with error message 'Username must be at least 6 characters.' when submitting a shorter email address", () => {
    const testUser = {
      username: invalidTestuser.usernameShoterThan6Chars,
      email: testuser.email,
      password: testuser.password,
    }

    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user`,
      body: testUser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq("Username must be at least 6 characters.")
    })
  })

  it("should respond with error message 'Username must be shorter than 20 characters.' when submitting a longer username", () => {
    const testUser = {
      username: invalidTestuser.usernameLongerThan20Chars,
      email: testuser.email,
      password: testuser.password,
    }

    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user`,
      body: testUser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq(
        "Username must be shorter than 20 characters."
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
      url: `${apiUrl}/api/user`,
      body: testUser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq("Email must be at least 6 characters.")
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
      url: `${apiUrl}/api/user`,
      body: testUser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq("Email must be shorter than 255 characters.")
    })
  })

  it("should respond with error message 'Password must be at least 8 characters.' when submitting a shorter password", () => {
    const testUser = {
      username: testuser.username,
      email: testuser.email,
      password: invalidTestuser.passwordShorterThan8Chars,
    }

    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user`,
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
      url: `${apiUrl}/api/user`,
      body: testUser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq("Password must be less than 128 characters.")
    })
  })
})
