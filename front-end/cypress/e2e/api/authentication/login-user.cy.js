/// <reference types="cypress" />

describe("LOGIN User - (POST) /api/login", () => {
  const apiUrl = "http://localhost:4000"

  const testUser = {
    username: "testuser1",
    email: "testuser1@gmail.com",
    password: "123456",
  }

  const unexistingUser = {
    username: "unexistingUser",
    email: "unexistingUser@gmail.com",
    password: "123456",
  }

  beforeEach(() => {
    // Delete all db records
    cy.deleteTestUsers()
    // Register user
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user/`,
      body: testUser,
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
      body: testUser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it("should include a success message in its response", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/login`,
      body: testUser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.message).to.eq("User successfully logged in!")
    })
  })

  it("should include the correct user properties in its response", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/login`,
      body: testUser,
      failOnStatusCode: false,
    }).then((res) => {
      const userData = res.body.data.find(
        (user) => user.email === testUser.email
      )
      expect(userData).to.haveOwnProperty("username", testUser.username)
      expect(userData).to.haveOwnProperty("email", testUser.email)
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
})
