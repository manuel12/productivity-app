/// <reference types="cypress" />

describe("DELETE Todo - (DELETE) /api/todos/:id", () => {
  const apiUrl = "http://localhost:4000"
  const testTodo = {
    completed: true,
    description: "Run a marathon (test)",
  }
  const invalidId = 999999999
  const ctx = {}

  beforeEach(() => {
    // Create todo to delete and get it's ID
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos/`,
      body: testTodo,
    }).then((res) => {
      ctx.todoId = res.body.id
    })
  })

  // DELETE  - /api/todos/:id updateTodo
  it("Verify a specific todo can be deleted when requesting with valid id", () => {
    cy.request({
      method: "DELETE",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(204)
    })
  })

  it("Verify deleting a todo subtracts -1 to the current amount of todos", () => {
    // Check current amount of todos
    let amountTodos
    let newAmountTodos

    cy.request("http://localhost:4000/api/todos/")
      .then((res) => {
        amountTodos = res.body.data.length
      })
      .then(() => {
        // Delete todo
        cy.request({
          method: "DELETE",
          url: `${apiUrl}/api/todos/${ctx.todoId}`,
        }).then(() => {
          // Check new amount of todos is now -1
          cy.request("http://localhost:4000/api/todos/").then((res) => {
            newAmountTodos = res.body.data.length
            expect(newAmountTodos).to.eq(amountTodos - 1)
          })
        })
      })
  })

  it("Verify a todo is not deleted with invalid id", () => {
    // Delete todo with invalid id
    cy.request({
      method: "DELETE",
      url: `${apiUrl}/api/todos/${invalidId}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404)
      expect(res.body.error).to.eq(`Todo with id ${invalidId} not found`)
    })
  })

  afterEach(() => {
    // Delete created test todos
    cy.deleteTestTodos()
  })
})
