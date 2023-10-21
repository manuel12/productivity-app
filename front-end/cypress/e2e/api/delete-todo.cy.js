/// <reference types="cypress" />

describe("DELETE Todo API tests", () => {
  const apiUrl = "http://localhost:4000"
  const testTodo = {
    completed: true,
    description: "Run a marathon (test)",
  }
  const ctx = {}

  beforeEach(() => {
    // Create todo to delete and get it's ID
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos/`,
      body: testTodo,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo successfully created!`)
      ctx.todoId = res.body.id
    })
  })

  // DELETE  - /api/todos/:id updateTodo
  it("DELETE - /api/todos/:id - should delete a specific todo", () => {
    cy.request({
      method: "DELETE",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo successfully deleted!`)
    })
  })
})
