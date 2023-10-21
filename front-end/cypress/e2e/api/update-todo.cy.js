/// <reference types="cypress" />

describe("UPDATE Todo API tests", () => {
  const apiUrl = "http://localhost:4000"
  const testTodo = {
    completed: true,
    description: "Run a marathon (test)",
  }

  const updatedTestTodo = {
    completed: false,
    description: "Run a half-marathon (test)",
  }

  const ctx = {}

  beforeEach(() => {
    // Create todo to update and get it's ID
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos/`,
      body: testTodo,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo successfully created!`)
      ctx.todoId = res.body.id
    })
  })

  // PATCH  - /api/todos/:id updateTodo
  it("PATCH - /api/todos/:id - should update a specific todo", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
      body: updatedTestTodo,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo successfully updated!`)
      expect(res.body.data.completed).to.eq(updatedTestTodo.completed)
      expect(res.body.data.description).to.eq(updatedTestTodo.description)
    })
  })
})
