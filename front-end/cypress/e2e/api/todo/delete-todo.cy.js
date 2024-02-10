/// <reference types="cypress" />

describe("DELETE Todo - (DELETE) /api/todos/:id", () => {
  const apiUrl = "http://localhost:4000"
  const testTodo = {
    completed: true,
    description: "Run a marathon (test)",
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
    // Create todo to delete and get it's ID
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

  // DELETE  - /api/todos/:id updateTodo
  it("should delete a specific todo with valid id", () => {
    cy.request({
      method: "DELETE",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(204)
    })
  })

  it("should subtract -1 to the current number of todos when deleting one", () => {
    // Check current amount of todos
    let amountTodos
    let newAmountTodos

    cy.request({
      method: "GET",
      url: `${apiUrl}/api/todos/`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        amountTodos = res.body.data.length
      })
      .then(() => {
        // Delete todo
        cy.request({
          method: "DELETE",
          url: `${apiUrl}/api/todos/${ctx.todoId}`,
          headers: {
            Authorization: `Bearer ${ctx.token}`,
            "Content-Type": "application/json",
          },
        }).then(() => {
          // Check new amount of todos is now -1
          cy.request({
            method: "GET",
            url: `${apiUrl}/api/todos/`,
            headers: {
              Authorization: `Bearer ${ctx.token}`,
              "Content-Type": "application/json",
            },
          }).then((res) => {
            newAmountTodos = res.body.data.length
            expect(newAmountTodos).to.eq(amountTodos - 1)
          })
        })
      })
  })

  // Negative tests

  it("should not delete a todo with invalid id", () => {
    // Delete todo with invalid id
    cy.request({
      method: "DELETE",
      url: `${apiUrl}/api/todos/${invalidId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404)
      expect(res.body.error).to.eq(`Todo with id ${invalidId} not found`)
    })
  })

  it("should not delete a todo with invalid token", () => {
    // Delete todo with invalid id
    cy.request({
      method: "DELETE",
      url: `${apiUrl}/api/todos/${invalidId}`,
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
