/// <reference types="cypress" />

describe("UPDATE Todo - (PATCH) /api/todos/:id", () => {
  const apiUrl = "http://localhost:4000"
  const testTodo = {
    completed: true,
    description: "Run a marathon (test)",
  }
  const updatedTestTodo = {
    completed: false,
    description: "Run a half-marathon (test)",
  }
  const invalidDataTestTodo = {
    completed: 6,
    description: ["Run a marathon"],
  }
  const invalidId = 999999999
  const ctx = {}

  before(() => {
    // Login with API
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/login/`,
      body: { email: "manuelpinedacabeza@gmail.com", password: "Testpass1!" },
      failOnStatusCode: false,
    }).then((res) => {
      ctx.token = res.body.token
    })
  })

  beforeEach(() => {
    // Create todo to update and get it's ID
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos/`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: testTodo,
    }).then((res) => {
      ctx.todoId = res.body.id
    })
  })

  // Positive tests

  // PATCH  - /api/todos/:id updateTodo
  it("should update a specific todo with valid data", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: updatedTestTodo,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo successfully updated!`)
      expect(res.body.data.completed).to.eq(updatedTestTodo.completed)
      expect(res.body.data.description).to.eq(updatedTestTodo.description)
    })
  })

  // Negative tests

  it("should not update a todo with invalid data", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: invalidDataTestTodo,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body.error).to.eq(
        "No completed (boolean) specified, No description specified."
      )
    })
  })

  it("should not update a todo with invalid id", () => {
    // Update todo with invalid id
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todos/${invalidId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: testTodo,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404)
      expect(res.body.error).to.eq(`Todo with id ${invalidId} not found`)
    })
  })

  it("should not update todo with empty data", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400)
    })
  })

  it("should respond with a message indicating any missing data", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq(
        "No completed (boolean) specified, No description specified."
      )
    })
  })

  it("should not update a todo with invalid token", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401)
      expect(res.body.error).to.eq("Unauthorized: No token provided.")
    })
  })

  afterEach(() => {
    // Delete created test todos
    cy.deleteTestTodos(ctx.token)
  })
})
