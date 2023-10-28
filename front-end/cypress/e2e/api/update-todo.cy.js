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

  beforeEach(() => {
    // Create todo to update and get it's ID
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos/`,
      body: testTodo,
    }).then((res) => {
      ctx.todoId = res.body.id
    })
  })

  // PATCH  - /api/todos/:id updateTodo
  it("Verify a specific todo can be updated when requesting with valid data", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
      body: updatedTestTodo,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo successfully updated!`)
      expect(res.body.data.completed).to.eq(updatedTestTodo.completed)
      expect(res.body.data.description).to.eq(updatedTestTodo.description)
    })
  })

  it("Verify a todo is not updated with invalid data", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
      body: invalidDataTestTodo,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body.error).to.eq(
        "No completed (boolean) specified, No description specified."
      )
    })
  })

  it("Verify a todo is not updated when requesting with invalid id", () => {
    // Delete todo with invalid id
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todos/${invalidId}`,
      body: testTodo,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404)
      expect(res.body.error).to.eq(`Todo with id ${invalidId} not found`)
    })
  })

  afterEach(() => {
    // Delete created test todos
    cy.request({
      method: "DELETE",
      url: "http://localhost:4000/api/todos/delete-test-todos/",
    })
  })
})
