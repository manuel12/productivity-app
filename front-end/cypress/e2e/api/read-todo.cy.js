/// <reference types="cypress" />

describe("READ Todo API tests", () => {
  const apiUrl = "http://localhost:4000"
  const testTodo = {
    completed: true,
    description: "Run a marathon (test)",
  }

  // GET  - /api/todos/ getTodos
  it("GET - /api/todos/ - should retrieve all existing todos", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/api/todos/`,
      body: testTodo,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todos successfully retrieved!`)
      expect(res.body.data.length).to.be.above(0)
      return expect(Array.isArray(res.body.data)).to.be.true
    })
  })

  // GET  - /api/todos/:id getTodo
  it("GET - /api/todos/:id - should retrieve a specific todo", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/api/todos/1`,
      body: testTodo,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo successfully retrieved!`)
    })
  })
})
