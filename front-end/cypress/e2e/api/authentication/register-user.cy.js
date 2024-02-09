/// <reference types="cypress" />

describe("REGISTER User - (POST) /api/user", () => {
  const apiUrl = "http://localhost:4000"

  const testUser = {
    username: "testuser",
    email: "testuser1@gmail.com",
    password: "123456",
  }

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
      body: testUser,
    }).then((res) => {
      expect(res.status).to.eq(201)
    })
  })

  it("should respond with a success message when registering user", () => {
    // Register credentials
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user/`,
      body: testUser,
    }).then((res) => {
      expect(res.body.message).to.eq(
        `User ${testUser.email} successfully registered!`
      )
    })
  })

  it("should respond with the correct properties for the registered user", () => {
    // Register credentials
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user/`,
      body: testUser,
    }).then((res) => {
      const userData = res.body.data
      expect(userData).to.haveOwnProperty("username", testUser.username)
      expect(userData).to.haveOwnProperty("email", testUser.email)
      expect(userData).to.haveOwnProperty("password")
    })
  })

  // Negative tests

  // POST - /api/user/ registerUser"
  it("should not allow a user to register with invalid (existing) data", () => {
    // Register credentials
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user/`,
      body: testUser,
    }).then((res) => {
      expect(res.body.message).to.eq(
        `User ${testUser.email} successfully registered!`
      )
    })

    // Register credentials again.
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/user/`,
      body: testUser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq(
        `A user with email ${testUser.email} already exists!`
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
        "No username specified, No email specified, No password specified"
      )
    })
  })
})
